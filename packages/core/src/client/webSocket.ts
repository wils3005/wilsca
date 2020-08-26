import * as z from "zod";

const { host, protocol } = window.location;

const protocolMap = new Map([
  ["http:", "ws:"],
  ["https:", "wss:"],
]);

const wsProtocol = z.string().parse(protocolMap.get(protocol));
const webSocket = new WebSocket(`${wsProtocol}//${host}`);

webSocket.addEventListener("open", () => console.info("WEBSOCKET OPEN"));
webSocket.addEventListener("message", handleMessage);

Object.assign(globalThis, { say });

export default webSocket;

export function handleMessage(
  this: WebSocket,
  eventMessage: MessageEvent
): void {
  console.log("WEBSOCKET MESSAGE", eventMessage.data);
}

export function say(s: string): void {
  try {
    webSocket.send(s);
  } catch (e) {
    console.error(e);
  }
}
