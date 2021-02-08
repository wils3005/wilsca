import Config from "schemas/config";
import CreateInstance from "create-instance";
import Express from "express";
import WS from "ws";

function main(server: WS.Server, options?: Config): Express.Express {
  const app = Express();

  const newOptions = Config.parse({
    host: "::",
    port: 9000,
    expireTimeout: 5000,
    aliveTimeout: 60000,
    key: "peerjs",
    path: "/",
    concurrentLimit: 5000,
    allowDiscovery: false,
    proxied: false,
    cleanupOutMessages: 1000,
    ...options,
  });

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

    CreateInstance(app, server, newOptions);
  });

  return app;
}

export default main;
