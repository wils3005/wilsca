import AuthMiddleware from "auth";
import CallsApi from "calls";
import { Config } from "types";
import MessageHandler from "message-handler";
import PublicApi from "public";
import Realm from "realm";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

function main({
  config,
  realm,
  messageHandler,
}: {
  config: Config;
  realm: Realm;
  messageHandler: MessageHandler;
}): express.Router {
  const authMiddleware = new AuthMiddleware(config, realm);

  const app = express.Router();

  const jsonParser = bodyParser.json();

  app.use(cors());

  app.use("/:key", PublicApi({ config, realm }));
  app.use(
    "/:key/:id/:token",
    authMiddleware.handle,
    jsonParser,
    CallsApi({ realm, messageHandler })
  );

  return app;
}

export default main;
