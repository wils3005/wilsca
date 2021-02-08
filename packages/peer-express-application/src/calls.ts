import ClientMessage from "schemas/client-message";
import Express from "express";
import MessageHandler from "message-handler";
import Realm from "realm";

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
  ): unknown => {
    const { id } = req.params;

    if (!id) return next();

    const client = realm.getClientById(id);

    if (!client) {
      throw new Error(`client not found:${id}`);
    }

    const message = ClientMessage.parse(req.body);
    message.src = id;

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
