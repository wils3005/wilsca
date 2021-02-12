import AuthMiddleware from "./auth-middleware";
import CORS from "cors";
import Calls from "./calls";
import Config from "./config";
import Express from "express";
import MessageHandler from "./message-handler";
import Pino from "pino";
import Public from "./public";
import Realm from "./realm";

class API {
  realm: Realm;
  messageHandler: MessageHandler;
  config: Config;
  logger: Pino.Logger;
  authMiddleware: AuthMiddleware;
  router: Express.Router;
  public: Public;
  calls: Calls;

  constructor(
    realm: Realm,
    messageHandler: MessageHandler,
    config: Config,
    logger: Pino.Logger
  ) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.config = config;
    this.logger = logger;

    this.authMiddleware = new AuthMiddleware(realm, this.config, this.logger);
    this.router = Express.Router();
    this.public = new Public(this.realm, this.config, this.logger);
    this.calls = new Calls(realm, messageHandler, this.logger);

    this.router.use(CORS());
    // this.router.use("/:key", this.public.router);
    this.router.use("/", this.public.router);
    // this.router.use(
    //   "/:key/:id/:token",
    //   (...args) => this.authMiddleware.requestHandler(...args),
    //   Express.json(),
    //   this.calls.router
    // );

    this.logger.info("API.constructor");
  }
}

export default API;
