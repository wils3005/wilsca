import Express from "express";
import Message from "./message";
import MessageHandler from "./message-handler";
import Realm from "./realm";

class Calls {
  realm: Realm;
  messageHandler: MessageHandler;
  app: Express.Router;

  constructor(realm: Realm, messageHandler: MessageHandler) {
    this.realm = realm;
    this.messageHandler = messageHandler;
    this.app = Express.Router();

    this.app.post("/offer", (...args) => this.handle(...args));
    this.app.post("/candidate", (...args) => this.handle(...args));
    this.app.post("/answer", (...args) => this.handle(...args));
    this.app.post("/leave", (...args) => this.handle(...args));
  }

  handle(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void {
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
