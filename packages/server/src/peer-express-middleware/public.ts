import Config from "./config";
import Express from "express";
import Realm from "./realm";

class Public {
  realm: Realm;
  config: Config;
  app: Express.Router;

  constructor(realm: Realm, config: Config) {
    this.realm = realm;
    this.config = config;
    this.app = Express.Router();

    // Retrieve guaranteed random ID.
    this.app.get("/id", (_, res: Express.Response) => {
      res.contentType("html");
      res.send(realm.generateClientId(config.generateClientId));
    });

    // Get a list of all peers for a key, enabled by the `allowDiscovery` flag.
    this.app.get("/peers", (_, res: Express.Response) => {
      if (config.allowDiscovery) {
        const clientsIds = realm.getClientsIds();

        return res.send(clientsIds);
      }

      res.sendStatus(401);
    });
  }
}

export default Public;
