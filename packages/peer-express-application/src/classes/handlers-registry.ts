import Client from "./client";
import ClientMessage from "../schemas/client-message";
import { Handler } from "../types";
import MessageType from "../enums/message-type";

class HandlersRegistry {
  private readonly handlers = new Map<MessageType, Handler>();

  public registerHandler(messageType: MessageType, handler: Handler): void {
    if (this.handlers.has(messageType)) return;

    this.handlers.set(messageType, handler);
  }

  public handle(client: Client | undefined, message: ClientMessage): boolean {
    const { type } = message;

    const handler = this.handlers.get(type);

    if (!handler) return false;

    return handler(client, message);
  }
}

export default HandlersRegistry;
