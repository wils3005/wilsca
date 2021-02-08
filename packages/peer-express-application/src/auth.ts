import { Config } from "types";
import Errors from "errors";
import Express from "express";
import Realm from "realm";

class AuthMiddleware {
  constructor(private readonly config: Config, private readonly realm: Realm) {}

  public handle = (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): unknown => {
    const { id, token, key } = req.params;

    if (key !== this.config.key) {
      return res.status(401).send(Errors.INVALID_KEY);
    }

    if (!id) {
      return res.sendStatus(401);
    }

    const client = this.realm.getClientById(id);

    if (!client) {
      return res.sendStatus(401);
    }

    if (client.getToken() && token !== client.getToken()) {
      return res.status(401).send(Errors.INVALID_TOKEN);
    }

    next();
  };
}

export default AuthMiddleware;
