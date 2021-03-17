import { MessageType } from "./enums";
import { Client } from "./client";
import { IMessage } from "./message";
import { Handler } from "./handler";

export interface IHandlersRegistry {
  registerHandler(messageType: MessageType, handler: Handler): void;
  handle(client: Client | undefined, message: IMessage): boolean;
}

export class HandlersRegistry implements IHandlersRegistry {
  private readonly handlers: Map<MessageType, Handler> = new Map();

  public registerHandler(messageType: MessageType, handler: Handler): void {
    if (this.handlers.has(messageType)) return;

    this.handlers.set(messageType, handler);
  }

  public handle(client: Client | undefined, message: IMessage): boolean {
    const { type } = message;

    const handler = this.handlers.get(type);

    if (!handler) return false;

    return handler(client, message);
  }
}
