import Express from "express";
import Message from "./message";
import MessageHandler from "./message-handler";
import Pino from "pino";
import Realm from "./realm";

class Calls {
  realm: Realm;
  messageHandler: MessageHandler;
  logger: Pino.Logger;
  router: Express.Router;

  constructor(
    realm: Realm,
    messageHandler: MessageHandler,
    logger: Pino.Logger
  ) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.logger = logger;
    this.router = Express.Router();

    this.router.post("/offer", (...args) => this.handle(...args));
    this.router.post("/candidate", (...args) => this.handle(...args));
    this.router.post("/answer", (...args) => this.handle(...args));
    this.router.post("/leave", (...args) => this.handle(...args));
    this.logger.info("Calls.constructor");
  }

  handle(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void {
    this.logger.info("Calls.handle");
    const { id } = req.params;
    if (!id) return next();

    const client = this.realm.getClientById(id);
    if (!client) {
      throw new Error(`client not found:${id}`);
    }

    const { type, dst, payload } = Message.parse(req.body);
    const message: Message = {
      type,
      src: id,
      dst,
      payload,
    };

    this.messageHandler.handle(client, message);
    res.sendStatus(200);
  }
}

export default Calls;
