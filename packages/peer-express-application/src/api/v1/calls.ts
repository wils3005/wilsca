import express from "express";
import { ClientMessageHandler } from "../../messageHandler";
import { ClientMessage } from "../../models/message";
import { IRealm } from "../../models/realm";

export default ({
  realm,
  messageHandler,
}: {
  realm: IRealm;
  messageHandler: ClientMessageHandler;
}): express.Router => {
  const app = express.Router();

  const handle = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): unknown => {
    const { id } = req.params;

    if (!id) return next();

    const client = realm.getClientById(id);

    if (!client) {
      throw new Error(`client not found:${id}`);
    }

    const { type, dst, payload } = req.body;

    const message: ClientMessage = {
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
