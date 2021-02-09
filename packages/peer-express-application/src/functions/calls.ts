import ClientMessage from "../schemas/client-message";
import Express from "express";
import MessageHandler from "../classes/message-handler";
import Realm from "../classes/realm";

function main(realm: Realm, messageHandler: MessageHandler): Express.Router {
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

// export default class Calls {
//   realm: Realm;
//   messageHandler: MessageHandler;
//   app: Express.Router;

//   constructor(realm: Realm, messageHandler: MessageHandler) {
//     this.realm = realm;
//     this.messageHandler = messageHandler;
//     this.app = Express.Router();

//     this.app.post("/offer", this.call.bind(this));
//     this.app.post("/candidate", this.call.bind(this));
//     this.app.post("/answer", this.call.bind(this));
//     this.app.post("/leave", this.call.bind(this));
//   }

//   call(
//     req: Express.Request,
//     res: Express.Response,
//     next: Express.NextFunction
//   ): void {
//     const { id } = req.params;
//     if (!id) return next();

//     const client = this.realm.getClientById(id);

//     if (!client) {
//       throw new Error(`client not found:${id}`);
//     }

//     const message = ClientMessage.parse(req.body);
//     message.src = id;

//     this.messageHandler.handle(client, message);
//     res.sendStatus(200);
//   }
// }
