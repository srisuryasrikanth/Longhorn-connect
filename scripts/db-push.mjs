import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const cwd = process.cwd();
const databaseFile = join(cwd, "prisma", "dev.db");
const tempDir = mkdtempSync(join(tmpdir(), "utac-prisma-"));
const sqlFile = join(tempDir, "schema.sql");

function runNpx(args, options = {}) {
  if (process.platform === "win32") {
    return execFileSync("cmd.exe", ["/c", "npx", ...args], options);
  }

  return execFileSync("npx", args, options);
}

try {
  const diffArgs = existsSync(databaseFile)
    ? ["prisma", "migrate", "diff", "--from-schema-datasource", "prisma/schema.prisma", "--to-schema-datamodel", "prisma/schema.prisma", "--script"]
    : ["prisma", "migrate", "diff", "--from-empty", "--to-schema-datamodel", "prisma/schema.prisma", "--script"];

  const sql = runNpx(diffArgs, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"]
  });

  if (!sql.trim() || sql.includes("This is an empty migration")) {
    console.log("Database schema is already up to date.");
    process.exit(0);
  }

  writeFileSync(sqlFile, sql);

  runNpx(["prisma", "db", "execute", "--file", sqlFile, "--schema", "prisma/schema.prisma"], {
    cwd,
    stdio: "inherit"
  });
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
