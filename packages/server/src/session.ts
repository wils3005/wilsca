import * as UUID from "uuid";
import JSONObject from "./json-object";
import Pino from "pino";
import WebSocket from "ws";

class Session {
  static readonly all = new Set<Session>();

  static ids(): string {
    return JSON.stringify({
      ids: Array.from(this.all).map((s) => s.id),
    });
  }

  readonly logger = Pino({ level: "debug", name: this.constructor.name });
  readonly webSocket: WebSocket;
  readonly id = UUID.v4();

  constructor(webSocket: WebSocket) {
    this.logger.debug("constructor");
    webSocket.onclose = (ev) => this.handleClose(ev);
    webSocket.onerror = (ev) => this.handleError(ev);
    webSocket.onmessage = (ev) => this.handleMessage(ev);
    webSocket.onopen = (ev) => this.handleOpen(ev);
    webSocket.send(Session.ids());
    this.webSocket = webSocket;
    Session.all.add(this);
  }

  handleClose(event: WebSocket.CloseEvent): void {
    this.logger.debug("handleClose");
    Session.all.delete(this);
  }

  handleError(event: WebSocket.ErrorEvent): void {
    this.logger.error("handleError");
    event.target.close();
    Session.all.delete(this);
  }

  handleMessage(event: WebSocket.MessageEvent): void {
    this.logger.debug("handleMessage");
    const { data, target } = event;

    try {
      Session.all.forEach((session) => {
        if (session.webSocket == target) return;

        session.webSocket.send(
          JSON.stringify(JSONObject.parse(JSON.parse(String(data))))
        );
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  handleOpen(event: WebSocket.OpenEvent): void {
    this.logger.debug("handleOpen");
  }
}

export default Session;
