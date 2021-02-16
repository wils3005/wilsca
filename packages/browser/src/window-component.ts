import BaseComponent from "./base-component";
import DatabaseComponent from "./database-component";
import LocalVideoElementComponent from "./local-video-element-component";
import ServiceWorkerContainerComponent from "./service-worker-container-component";
import WebSocketComponent from "./web-socket-component";

class WindowComponent extends BaseComponent {
  databases = DatabaseComponent.init();
  localVideoElementComponent = new LocalVideoElementComponent();
  peerConnections = new Map<string, RTCPeerConnection>();
  serviceWorkerContainerComponent = new ServiceWorkerContainerComponent();
  webSocketComponent = new WebSocketComponent();

  constructor() {
    super();
  }
}

export default WindowComponent;
