// import Events from "events";
import Express from "express";
import WS from "ws";
import { createInstance } from "./instance";

//
// type MyWebSocket = WS & Events.EventEmitter;

// type Optional<T> = {
//   [P in keyof T]?: T[P] | undefined;
// };

// interface ClientMessage {
//   readonly type: MessageType;
//   readonly src: string;
//   readonly dst: string;
//   readonly payload?: unknown;
// }

// interface ExpressApplication extends Express.Express {
//   on(event: string, callback: (...args: any[]) => void): this;
//   on(event: "connection", callback: (client: Client) => void): this;
//   on(event: "disconnect", callback: (client: Client) => void): this;
//   on(
//     event: "message",
//     callback: (client: Client, message: ClientMessage) => void
//   ): this;
//   on(event: "error", callback: (error: Error) => void): this;
// }

function PeerExpressApplication(
  server: WS.Server,
  options?: Config
): Express.Express {
  const app = Express();

  const newOptions: Config = {
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

export default PeerExpressApplication;
