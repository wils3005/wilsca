import express from "express";
import { IMessageHandler } from "./message-handler";
import { IMessage } from "./message";
import { IRealm } from "./realm";

export default ({
  realm,
  messageHandler,
}: {
  realm: IRealm;
  messageHandler: IMessageHandler;
}): express.Router => {
  const app = express.Router();

  const handle = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    const { id } = req.params;

    if (!id) next();

    const client = realm.getClientById(id);

    if (!client) {
      throw new Error(`client not found:${id}`);
    }

    const { type, dst, payload } = req.body;

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
};
