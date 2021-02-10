// import * as Zod from "zod";
import MyWebSocket from "./my-web-socket";

// const IClient = Zod.object({
//   getId: Zod.function(Zod.tuple([]), Zod.string()),
//   getToken: Zod.function(Zod.tuple([]), Zod.string()),
//   getSocket: Zod.function(
//     Zod.tuple([]),
//     Zod.instanceof(MyWebSocket)
//   ).optional(),
//   setSocket: Zod.function(Zod.tuple([]), Zod.void()),
//   getLastPing: Zod.function(Zod.tuple([]), Zod.number()),
//   setLastPing: Zod.function(Zod.tuple([]), Zod.void()),
//   send: Zod.function(Zod.tuple([Zod.any()]), Zod.void()),
// });
declare interface IClient {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: unknown): void;
}

export default IClient;
