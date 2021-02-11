import AuthMiddleware from "./auth-middleware";
import CORS from "cors";
import Calls from "./calls";
import Config from "./schemas/config";
import Express from "express";
import MessageHandler from "./message-handler";
import Public from "./public";
import Realm from "./realm";

class API {
  realm: Realm;
  messageHandler: MessageHandler;
  config: Config;
  authMiddleware: AuthMiddleware;
  app: Express.Router;

  constructor(realm: Realm, messageHandler: MessageHandler, config: Config) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.config = config;
    this.authMiddleware = new AuthMiddleware(config, realm);
    this.app = Express.Router();
    this.app.use(CORS());
    this.app.use("/:key", new Public(realm, config).app);
    this.app.use(
      "/:key/:id/:token",
      this.authMiddleware.handle,
      Express.json(),
      new Calls(realm, messageHandler).app
    );
  }
}

export default API;
