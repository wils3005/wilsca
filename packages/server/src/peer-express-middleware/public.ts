import Config from "./config";
import Express from "express";
import Pino from "pino";
import Realm from "./realm";

class Public {
  realm: Realm;
  config: Config;
  logger: Pino.Logger;
  router: Express.Router;

  constructor(realm: Realm, config: Config, logger: Pino.Logger) {
    this.realm = realm;
    this.config = config;
    this.logger = logger;
    this.router = Express.Router();

    // Retrieve guaranteed random ID.
    this.router.get("/id", (_, res: Express.Response) => {
      this.logger.info("Public -- /id");
      res.contentType("html");
      res.send(realm.generateClientId(config.generateClientId));
    });

    // Get a list of all peers for a key, enabled by the `allowDiscovery` flag.
    this.router.get("/peers", (_, res: Express.Response) => {
      this.logger.info("Public -- /peers");
      if (config.allowDiscovery) {
        const clientsIds = realm.getClientsIds();

        return res.send(clientsIds);
      }

      res.sendStatus(401);
    });
    this.logger.info("Public.constructor");
  }
}

export default Public;
