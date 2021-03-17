import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import publicContent from "./app.json";
import Config from "./schemas/config";
import { IMessageHandler } from "./message-handler";
import { IRealm } from "./realm";
import { AuthMiddleware } from "./auth";
import CallsApi from "./calls";
import PublicApi from "./public";

export const Api = ({
  config,
  realm,
  messageHandler,
}: {
  config: Config;
  realm: IRealm;
  messageHandler: IMessageHandler;
}): express.Router => {
  const authMiddleware = new AuthMiddleware(config, realm);

  const app = express.Router();

  const jsonParser = bodyParser.json();

  app.use(cors());

  app.get("/", (_, res) => {
    res.send(publicContent);
  });

  app.use("/:key", PublicApi({ config, realm }));
  app.use(
    "/:key/:id/:token",
    authMiddleware.handle,
    jsonParser,
    CallsApi({ realm, messageHandler })
  );

  return app;
};
