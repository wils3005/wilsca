import { Client } from "./client";
import { IMessage } from "./message";

export type Handler = (
  client: Client | undefined,
  message: IMessage
) => boolean;
