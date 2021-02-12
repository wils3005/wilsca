import Config from "./config";
import Errors from "./errors";
import Express from "express";
import Pino from "pino";
import Realm from "./realm";

class AuthMiddleware {
  realm: Realm;
  config: Config;
  logger: Pino.Logger;

  constructor(realm: Realm, config: Config, logger: Pino.Logger) {
    this.realm = realm;
    this.config = config;
    this.logger = logger;
  }

  requestHandler(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): void {
    this.logger.info("AuthMiddleware.requestHandler");
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
