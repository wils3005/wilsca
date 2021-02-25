import "./app.css";
import "./favicon.ico";
import "./index.html";
import * as Zod from "zod";
import BroadcastChannelManager from "../broadcast-channel-manager";
import DatabaseManager from "../database-manager";
import Logger from "../../shared/logger";
import Peer from "@wilsjs/peerjs";
import ServiceWorkerManager from "./service-worker-manager";
import VideoElementManager from "./video-element-manager";

class WindowApplication {
  log = Logger.log.bind(this);
  bcManager: BroadcastChannelManager = new BroadcastChannelManager(this);
  databaseManager = new DatabaseManager();

  localVideoElementManager = new VideoElementManager(this);
  serviceWorkerManager = new ServiceWorkerManager(this);

  peer = new Peer({
    host: "localhost",
    port: 8080,
    path: "/peerjs/myapp",
  });

  private _id?: string;

  get id(): string {
    if (this._id) return this._id;

    return (this.id = Zod.string().parse(
      this.databaseManager.get("id").result
    ));
  }

  set id(id: string) {
    this.databaseManager.put("id", id);
    this._id = id;
  }
}

export default WindowApplication;
