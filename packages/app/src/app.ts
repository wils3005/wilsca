import express, { Express } from "express";
import expressPinoLogger from "express-pino-logger";
import { join } from "path";
import logger from "./logger";
import peerServer from "./peerServer";

const app: Express = express();

app.use(expressPinoLogger({ logger }));
app.use("/foo", peerServer);
// app.use(express.json());
app.get("/healthz", (_req, res) => res.end());
app.use(express.static(join(process.cwd(), "public")));

export default app;
