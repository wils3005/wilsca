import Config from "./schemas/config";
import CreateInstance from "./functions/create-instance";
import Express from "express";
import HTTP from "http";

const defaultConfig: Config = {
  host: "::",
  port: 9000,
  expire_timeout: 5000,
  alive_timeout: 60000,
  key: "peerjs",
  path: "/",
  concurrent_limit: 5000,
  allow_discovery: false,
  proxied: false,
  cleanup_out_msgs: 1000,
};

function main(server: HTTP.Server, options?: Config): Express.Express {
  const app = Express();

  const newOptions: Config = {
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

    CreateInstance({ app, server, options: newOptions });
  });

  return app;
}

export default main;
