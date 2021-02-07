import Client from "../models/client";
import { ClientMessage } from "../models/message";

export type Handler = (
  client: Client | undefined,
  message: ClientMessage
) => boolean;
