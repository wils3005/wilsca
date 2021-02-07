import { MessageType } from "../enums";

export interface ClientMessage {
  readonly type: MessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: unknown;
}
