import AuthMiddleware from "../classes/auth-middleware";
import CORS from "cors";
import Calls from "./calls";
import Config from "../schemas/config";
import Express from "express";
import MessageHandler from "../classes/message-handler";
import Public from "./public";
import Realm from "../classes/realm";

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

  app.use("/:key", Public({ config, realm }));
  app.use(
    "/:key/:id/:token",
    authMiddleware.handle,
    Express.json(),
    Calls({ realm, messageHandler })
  );

  return app;
}

export default main;
