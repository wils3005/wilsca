import Client from "./web-socket-wrapper";
import Express from "express";
import Message from "./message";

interface CustomExpress extends Express.Express {
  on(event: string, callback: (...args: any[]) => void): this;
  on(event: "connection", callback: (client: Client) => void): this;
  on(event: "disconnect", callback: (client: Client) => void): this;
  on(
    event: "message",
    callback: (client: Client, message: Message) => void
  ): this;
  on(event: "error", callback: (error: Error) => void): this;
}

export default CustomExpress;
