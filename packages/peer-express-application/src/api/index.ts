import { Config, IRealm } from "interfaces";
import { AuthMiddleware } from "api/auth";
import CallsApi from "api/v1/calls";
import MessageHandler from "message-handler";
import PublicApi from "api/v1/public";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export const Api = ({
  config,
  realm,
  messageHandler,
}: {
  config: Config;
  realm: IRealm;
  messageHandler: MessageHandler;
}): express.Router => {
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
};
