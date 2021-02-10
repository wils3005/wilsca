import Express from "express";
import IClient from "./iclient";
import IMessage from "./message";

declare interface CustomExpress extends Express.Express {
  on(event: string, callback: (...args: any[]) => void): this;
  on(event: "connection", callback: (client: IClient) => void): this;
  on(event: "disconnect", callback: (client: IClient) => void): this;
  on(
    event: "message",
    callback: (client: IClient, message: IMessage) => void
  ): this;
  on(event: "error", callback: (error: Error) => void): this;
}

export default CustomExpress;
