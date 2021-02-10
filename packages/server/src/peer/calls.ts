import Express from "express";
import IMessage from "./message";
import { IMessageHandler } from "./message-handler";
import { IRealm } from "./realm";

function main({
  realm,
  messageHandler,
}: {
  realm: IRealm;
  messageHandler: IMessageHandler;
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

    const { type, dst, payload } = IMessage.parse(req.body);

    const message: IMessage = {
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
