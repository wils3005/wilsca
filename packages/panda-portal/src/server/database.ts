import { default as logger } from "./logger";
import sqlite3 from "sqlite3";

const filename = "panda-portal.db";
const database = new sqlite3.Database(filename);

database.on("open", handleOpen);

export default database;

export function handleOpen(): void {
  logger.info({ database });
}
