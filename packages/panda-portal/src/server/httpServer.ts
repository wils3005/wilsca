import fs from "fs";
import http from "http";
import { default as logger } from "./logger";

const httpServerOptions = {};
const httpServer = http.createServer(httpServerOptions, requestListener);

export default httpServer;

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
