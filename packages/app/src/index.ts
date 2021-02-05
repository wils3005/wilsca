import { object, string } from "zod";
import { ExpressPeerServer } from "peer";
import { createServer } from "http";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import { join } from "path";
import pino from "pino";

const { env } = process;
const { PORT } = object({ PORT: string() }).parse(env);
const app = express();
const server = createServer(app);

const peerPath = "/peer";
const peerServer = ExpressPeerServer(server, { path: peerPath });
const peerClients: Set<PeerClient> = new Set();
const logger = pino();

function onConnection(client: PeerClient): void {
  peerClients.add(client);
  logger.info("PeerServer connection", { client });
}

function onDisconnect(client: PeerClient): void {
  peerClients.delete(client);
  logger.info("PeerServer disconnect", { client });
}

function onError(error: Error): void {
  logger.error("PeerServer error", error);
}

function onMessage(client: PeerClient, message: PeerMessage): void {
  logger.info("PeerServer message", { client, message });
}

app.use(express.json());

app.use(express.static(join(process.cwd(), "public")));
app.use(expressPinoLogger({ logger }));
app.use(peerPath, peerServer);

app.get("/healthz", (_req, res) => res.end());

app.listen(PORT);

export { onConnection, onDisconnect, onError, onMessage };
