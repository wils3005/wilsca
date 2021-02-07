import { IClient } from "../models/client";
import { ClientMessage } from "../models/message";

export type Handler = (
  client: IClient | undefined,
  message: ClientMessage
) => boolean;
