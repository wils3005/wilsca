import AuthMiddleware from "../classes/auth";
import CallsApi from "./calls";
import MessageHandler from "../classes/message-handler";
import Public from ".//public";
import Realm from "../classes/realm";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

function main(
  realm: Realm,
  allowDiscovery: boolean,
  generateClientId: () => string,
  key: string,
  messageHandler: MessageHandler
): express.Router {
  const authMiddleware = new AuthMiddleware(realm, key);
  const app = express.Router();
  const jsonParser = bodyParser.json();
  app.use(cors());
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
