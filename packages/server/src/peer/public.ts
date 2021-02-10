import Express from "express";
import { IConfig } from "./config";
import { IRealm } from "./realm";

function main({
  config,
  realm,
}: {
  config: IConfig;
  realm: IRealm;
}): Express.Router {
  const app = Express.Router();

  // Retrieve guaranteed random ID.
  app.get("/id", (_, res: Express.Response) => {
    res.contentType("html");
    res.send(realm.generateClientId(config.generateClientId));
  });

  // Get a list of all peers for a key, enabled by the `allowDiscovery` flag.
  app.get("/peers", (_, res: Express.Response) => {
    if (config.allow_discovery) {
      const clientsIds = realm.getClientsIds();

      return res.send(clientsIds);
    }

    res.sendStatus(401);
  });

  return app;
}

export default main;
