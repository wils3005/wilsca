import express from "express";
import Config from "./schemas/config";
import { IRealm } from "./realm";

export default ({
  config,
  realm,
}: {
  config: Config;
  realm: IRealm;
}): express.Router => {
  const app = express.Router();

  // Retrieve guaranteed random ID.
  app.get("/id", (_, res: express.Response) => {
    res.contentType("html");
    res.send(realm.generateClientId(config.generateClientId));
  });

  // Get a list of all peers for a key, enabled by the `allowDiscovery` flag.
  app.get("/peers", (_, res: express.Response) => {
    if (config.allow_discovery) {
      const clientsIds = realm.getClientsIds();

      return res.send(clientsIds);
    }

    res.sendStatus(401);
  });

  return app;
};
