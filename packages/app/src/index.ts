import { Client, Room, Server } from "colyseus";
import { object, string } from "zod";
import { EventEmitter } from "events";
import { ExpressPeerServer } from "peer";
import WebSocketLib from "ws";
import { createServer } from "http";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import { join } from "path";
import { monitor } from "@colyseus/monitor";
import pino from "pino";

type MyWebSocket = WebSocketLib & EventEmitter;

interface PeerClient {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: unknown): void;
}

enum PeerMessageType {
  OPEN = "OPEN",
  LEAVE = "LEAVE",
  CANDIDATE = "CANDIDATE",
  OFFER = "OFFER",
  ANSWER = "ANSWER",
  EXPIRE = "EXPIRE",
  HEARTBEAT = "HEARTBEAT",
  ID_TAKEN = "ID-TAKEN",
  ERROR = "ERROR",
}

interface PeerMessage {
  readonly type: PeerMessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: unknown;
}

const { env } = process;
const { PORT } = object({ PORT: string() }).parse(env);
const app = express();
const server = createServer(app);

const gameServer = new Server({ express: app, server });

const peerPath = "/peer";
const peerServer = ExpressPeerServer(server, { path: peerPath });
const peerClients: Set<PeerClient> = new Set();
const logger = pino();

class MyRoom extends Room {
  // this room supports only 4 clients connected
  maxClients = 4;

  onCreate(options: unknown): void {
    logger.info("ChatRoom created!", options);

    this.onMessage("message", (client, message) => {
      logger.info(
        "ChatRoom received message from",
        client.sessionId,
        ":",
        message
      );
      this.broadcast("messages", `(${client.sessionId}) ${String(message)}`);
    });
  }

  onJoin(client: Client): void {
    this.broadcast("messages", `${client.sessionId} joined.`);
  }

  onLeave(client: Client): void {
    this.broadcast("messages", `${client.sessionId} left.`);
  }

  onDispose(): void {
    logger.info("Dispose ChatRoom");
  }
}

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
app.use("/colyseus", monitor());

gameServer.define("myroom", MyRoom);

gameServer.onShutdown(() => logger.info("game server is going down."));
void gameServer.listen(Number(PORT));

export { MyRoom, onConnection, onDisconnect, onError, onMessage };
