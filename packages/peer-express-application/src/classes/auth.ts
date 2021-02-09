import Errors from "../enums/errors";
import Express from "express";
import Realm from "./realm";

class AuthMiddleware {
  constructor(private readonly realm: Realm, private readonly key: string) {
    this.realm = realm;
    this.key = key;
  }

  public handle = (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ): unknown => {
    const { id, token, key } = req.params;

    if (key !== this.key) {
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
