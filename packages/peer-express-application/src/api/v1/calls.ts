import * as Zod from "zod";
import { ClientMessage, IRealm } from "../../interfaces";
import Express from "express";
import MessageHandler from "../../message-handler";

const schema = Zod.object({
  type: Zod.enum([
    "ANSWER",
    "CANDIDATE",
    "ERROR",
    "EXPIRE",
    "HEARTBEAT",
    "ID-TAKEN",
    "LEAVE",
    "OFFER",
    "OPEN",
  ]),
  dst: Zod.string(),
  payload: Zod.unknown(),
}).strict();

function main({
  realm,
  messageHandler,
}: {
  realm: IRealm;
  messageHandler: MessageHandler;
}): Express.Router {
  const app = Express.Router();

  const handle = (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): unknown => {
    const { id } = req.params;

    if (!id) return next();

    const client = realm.getClientById(id);

    if (!client) {
      throw new Error(`client not found:${id}`);
    }

    const foo = schema.parse(req.body);
    const message: ClientMessage = { src: id, ...foo };

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
