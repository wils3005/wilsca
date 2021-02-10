import Express from "express";
import Message from "../schemas/message";
import MessageHandler from "../classes/message-handler";
import Realm from "../classes/realm";

function main({
  realm,
  messageHandler,
}: {
  realm: Realm;
  messageHandler: MessageHandler;
}): Express.Router {
  const app = Express.Router();

  const handle = (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void => {
    const { id } = req.params;

    if (!id) return next();

    const client = realm.getClientById(id);

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

    messageHandler.handle(client, message);

    res.sendStatus(200);
  };

  app.post("/offer", handle);
  app.post("/candidate", handle);
  app.post("/answer", handle);
  app.post("/leave", handle);

  return app;
}

export default main;
