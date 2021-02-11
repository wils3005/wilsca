import AuthMiddleware from "./auth-middleware";
import CORS from "cors";
import Calls from "./calls";
import Config from "./config";
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
  public: Public;
  calls: Calls;

  constructor(realm: Realm, messageHandler: MessageHandler, config: Config) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.config = config;
    this.authMiddleware = new AuthMiddleware(realm, this.config);
    this.app = Express.Router();
    this.public = new Public(realm, config);
    this.calls = new Calls(realm, messageHandler);

    this.app.use(CORS());
    this.app.use("/:key", this.public.app);
    this.app.use(
      "/:key/:id/:token",
      (...args) => this.authMiddleware.requestHandler(...args),
      Express.json(),
      this.calls.app
    );
  }
}

export default API;
