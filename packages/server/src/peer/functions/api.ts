import AuthMiddleware from "../classes/auth-middleware";
import CORS from "cors";
import CallsApi from "./calls";
import Config from "../schemas/config";
import Express from "express";
import MessageHandler from "../classes/message-handler";
import PublicApi from "./public";
import Realm from "../classes/realm";
import publicContent from "../app.json";

function main({
  config,
  realm,
  messageHandler,
}: {
  config: Config;
  realm: Realm;
  messageHandler: MessageHandler;
}): Express.Router {
  const authMiddleware = new AuthMiddleware(config, realm);

  const app = Express.Router();

  app.use(CORS());

  app.get("/", (_, res) => {
    res.send(publicContent);
  });

  app.use("/:key", PublicApi({ config, realm }));
  app.use(
    "/:key/:id/:token",
    authMiddleware.handle,
    Express.json(),
    CallsApi({ realm, messageHandler })
  );

  return app;
}

export default main;
