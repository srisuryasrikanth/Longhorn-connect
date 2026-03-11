import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();

function runNpx(args, options = {}) {
  if (process.platform === "win32") {
    return execFileSync("cmd.exe", ["/c", "npx", ...args], options);
  }

  return execFileSync("npx", args, options);
}

rmSync(join(cwd, "prisma", "dev.db"), { force: true });
rmSync(join(cwd, "prisma", "dev.db-journal"), { force: true });

execFileSync(process.execPath, ["scripts/db-push.mjs"], {
  cwd,
  stdio: "inherit"
});

runNpx(["tsx", "prisma/seed.ts"], {
  cwd,
  stdio: "inherit"
});
