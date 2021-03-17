import Config from "./schemas/config";
import Express from "express";
import Instance from "./instance";
import Net from "net";

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

class PeerServer {
  server: Net.Server;
  config: Config;
  app = Express();
  instance?: Instance;

  constructor(server: Net.Server, config?: Config) {
    this.server = server;

    this.config = {
      ...defaultConfig,
      ...config,
    };

    if (this.config.proxied) {
      this.app.set(
        "trust proxy",
        this.config.proxied === "false" ? false : !!this.config.proxied
      );
    }

    this.app.on("mount", () => {
      if (!server) {
        throw new Error(
          "Server is not passed to constructor - " + "can't start PeerServer"
        );
      }

      this.instance = new Instance({
        app: this.app,
        server,
        options: this.config,
      });
    });
  }
}

export default PeerServer;
