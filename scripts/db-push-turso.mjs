import { execFileSync } from "node:child_process";

import { createClient } from "@libsql/client";

const cwd = process.cwd();
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

function runNpx(args, options = {}) {
  if (process.platform === "win32") {
    return execFileSync("cmd.exe", ["/c", "npx", ...args], options);
  }

  return execFileSync("npx", args, options);
}

if (!tursoUrl) {
  throw new Error("TURSO_DATABASE_URL is required for npm run db:push:turso.");
}

const rawSql = runNpx(
  ["prisma", "migrate", "diff", "--from-empty", "--to-schema-datamodel", "prisma/schema.prisma", "--script"],
  {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"]
  }
);

if (!rawSql.trim() || rawSql.includes("This is an empty migration")) {
  console.log("No schema SQL was generated.");
  process.exit(0);
}

const normalizedSql = rawSql
  .replaceAll("CREATE TABLE ", "CREATE TABLE IF NOT EXISTS ")
  .replaceAll("CREATE UNIQUE INDEX ", "CREATE UNIQUE INDEX IF NOT EXISTS ");

const client = createClient({
  url: tursoUrl,
  ...(tursoAuthToken ? { authToken: tursoAuthToken } : {})
});

try {
  await client.executeMultiple(normalizedSql);
  console.log("Applied schema SQL to Turso.");
} finally {
  client.close();
}