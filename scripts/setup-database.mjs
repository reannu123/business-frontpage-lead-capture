import { mkdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const shouldReset = process.argv.includes("--reset");

function resolveSqlitePath(url) {
  if (!url.startsWith("file:")) {
    throw new Error("Only file: SQLite DATABASE_URL values are supported locally.");
  }

  const rawPath = url.replace(/^file:/, "");

  if (path.isAbsolute(rawPath)) {
    return rawPath;
  }

  return path.resolve(process.cwd(), "prisma", rawPath);
}

const databasePath = resolveSqlitePath(databaseUrl);
const migrationPath = path.resolve(
  process.cwd(),
  "prisma",
  "migrations",
  "0001_init",
  "migration.sql",
);

mkdirSync(path.dirname(databasePath), { recursive: true });

if (shouldReset) {
  rmSync(databasePath, { force: true });
  rmSync(`${databasePath}-journal`, { force: true });
}

const sql = readFileSync(migrationPath, "utf8");
const database = new DatabaseSync(databasePath);

try {
  database.exec(sql);
  console.log(`SQLite schema ready at ${databasePath}`);
} finally {
  database.close();
}
