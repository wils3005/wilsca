import EventEmitter from "events";
import WS from "ws";

export type MyWebSocket = WS & EventEmitter;
