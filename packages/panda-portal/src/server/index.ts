import fs from "fs";
import http from "http";
import pino from "pino";
import sqlite3 from "sqlite3";
import ws from "ws";

////////////////////////////////////////////////////////////////////////////////
// constants
const { PINO_OPTIONS, PORT } = process.env;
const loggerOptions = JSON.parse(String(PINO_OPTIONS)) as pino.LoggerOptions;
const logger = pino(loggerOptions);
const httpServerOptions = {};
const server = http.createServer(httpServerOptions, requestListener);
const wsServerOptions = { server };
const webSocketServer = new ws.Server(wsServerOptions);

const database = new sqlite3.Database("panda-portal.db");

////////////////////////////////////////////////////////////////////////////////
// functions
export function requestListener(
  req: http.IncomingMessage,
  res: http.ServerResponse
): void {
  let filename = String(req.url);
  if (filename == "/") filename = "index.html";
  const path = `${process.cwd()}/build/${filename}`;

  fs.readFile(path, (err, data) => {
    let statusCode = 200;
    let responseBody = data;

    if (err) {
      statusCode = 404;
      responseBody = Buffer.from(JSON.stringify(err));
    }

    res.writeHead(statusCode).end(responseBody);
    const { method, url, headers } = req;
    const { statusMessage } = res;
    logger.info({ method, url, headers, statusCode, statusMessage });
  });
}

export function handleMessage(this: ws, data: ws.Data): void {
  logger.info({ this: this, data });

  for (const client of webSocketServer.clients) {
    if (client == this) continue;

    client.send(`Message broadcast: ${String(data)}`);
  }
}

export function handleError(this: unknown, error: Error): void {
  logger.error({ this: this, error });
}

export function handleConnection(this: ws.Server, socket: ws): void {
  logger.info("handleConnection");
  socket.on("message", handleMessage);
  socket.on("error", handleError);
}

export function handleListen(this: http.Server): void {
  logger.info({ this: this });
}

////////////////////////////////////////////////////////////////////////////////
// effects
server.listen(PORT, handleListen);
webSocketServer.on("connection", handleConnection);
webSocketServer.on("error", handleError);

database.on("open", () => {
  logger.info({ database });
});
