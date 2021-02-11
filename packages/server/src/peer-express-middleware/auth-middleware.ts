import Config from "./config";
import Errors from "./errors";
import Express from "express";
import Realm from "./realm";

class AuthMiddleware {
  realm: Realm;
  config: Config;

  constructor(realm: Realm, config: Config) {
    this.realm = realm;
    this.config = config;
  }

  requestHandler(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void {
    const { id, token, key } = req.params;

    if (key !== this.config.key) {
      res.status(401).send(Errors.INVALID_KEY);
      return;
    }

    if (!id) {
      res.sendStatus(401);
      return;
    }

    const client = this.realm.getClientById(id);

    if (!client) {
      res.sendStatus(401);
      return;
    }

    if (client.getToken() && token !== client.getToken()) {
      res.status(401).send(Errors.INVALID_TOKEN);
    }

    next();
  }
}

export default AuthMiddleware;
