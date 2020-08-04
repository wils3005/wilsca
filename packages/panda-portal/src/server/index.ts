import "./database";
import "./webSocketServer";
import http from "http";
import { default as httpServer } from "./httpServer";
import { default as logger } from "./logger";

const { PORT = "8080" } = process.env;

httpServer.listen(PORT, handleListen);

export function handleListen(this: http.Server): void {
  logger.info({ this: this });
}
