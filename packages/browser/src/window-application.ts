import Base from "./base";
import DatabaseManager from "./database-manager";
import LocalVideoElement from "./local-video-element";
import ServiceWorkerManager from "./service-worker-manager";
import WebSocketManager from "./web-socket-manager";

class WindowApplication extends Base {
  databaseManager = DatabaseManager.init();
  localVideoElement = new LocalVideoElement();
  serviceWorkerManager = new ServiceWorkerManager();
  webSocketManager = new WebSocketManager();
}

export default WindowApplication;
