import * as Zod from "zod";
import Event from "events";
import WS from "ws";

const MyWebSocket = Zod.intersection(
  Zod.instanceof(WS),
  Zod.instanceof(Event.EventEmitter)
);

type MyWebSocket = Zod.infer<typeof MyWebSocket>;

export default MyWebSocket;
