import { IClient } from "./client";
import IMessage from "./message";

export type Handler = (
  client: IClient | undefined,
  message: IMessage
) => boolean;
