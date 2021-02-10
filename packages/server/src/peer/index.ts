import defaultConfig, { IConfig } from "./config";
import Express from "express";
import HTTP from "http";
import HTTPS from "https";
import Optional from "./optional";
import { createInstance } from "./instance";

function ExpressPeerServer(
  server: HTTP.Server,
  options?: IConfig
): Express.Express {
  const app = Express();

  const newOptions: IConfig = {
    ...defaultConfig,
    ...options,
  };

  if (newOptions.proxied) {
    app.set(
      "trust proxy",
      newOptions.proxied === "false" ? false : !!newOptions.proxied
    );
  }

  app.on("mount", () => {
    if (!server) {
      throw new Error(
        "Server is not passed to constructor - " + "can't start PeerServer"
      );
    }

    createInstance({ app, server, options: newOptions });
  });

  return app;
}

function PeerServer(
  options: Optional<IConfig> = {},
  callback?: (server: HTTP.Server) => void
): Express.Express {
  const app = Express();

  let newOptions: IConfig = {
    ...defaultConfig,
    ...options,
  };

  const port = newOptions.port;
  const host = newOptions.host;

  let server: HTTP.Server;

  const { ssl, ...restOptions } = newOptions;
  if (ssl && Object.keys(ssl).length) {
    server = HTTPS.createServer(ssl, app);

    newOptions = restOptions;
  } else {
    server = HTTP.createServer(app);
  }

  const peerjs = ExpressPeerServer(server, newOptions);
  app.use(peerjs);

  server.listen(port, host, () => callback?.(server));

  return peerjs;
}

export { ExpressPeerServer, PeerServer };
