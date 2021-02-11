import Client from "../web-socket-wrapper";
import Handler from "./handler";
import Message from "../message";
import MessageType from "./message-type";

class HandlersRegistry {
  handlers = new Map<MessageType, Handler>();

  registerHandler(messageType: MessageType, handler: Handler): void {
    if (this.handlers.has(messageType)) return;

    this.handlers.set(messageType, handler);
  }

  handle(client: Client | undefined, message: Message): boolean {
    const { type } = message;

    const handler = this.handlers.get(type);

    if (!handler) return false;

    return handler(client, message);
  }
}

export default HandlersRegistry;
