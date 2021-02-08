import AuthMiddleware from "classes/auth";
import CallsApi from "functions/calls";
import Config from "schemas/config";
import MessageHandler from "classes/message-handler";
import Public from "functions/public";
import Realm from "classes/realm";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

function main(
  realm: Realm,
  config: Config,
  messageHandler: MessageHandler
): express.Router {
  const authMiddleware = new AuthMiddleware(realm, config.key);
  const app = express.Router();
  const jsonParser = bodyParser.json();
  app.use(cors());
  const { allowDiscovery, generateClientId } = config;
  app.use("/:key", Public(realm, allowDiscovery, generateClientId));
  app.use(
    "/:key/:id/:token",
    authMiddleware.handle,
    jsonParser,
    CallsApi(realm, messageHandler)
  );

  return app;
}

export default main;
