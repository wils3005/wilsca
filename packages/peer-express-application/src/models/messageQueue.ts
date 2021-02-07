import { ClientMessage } from "./message";

export interface ClientMessageQueue {
  getLastReadAt(): number;

  addMessage(message: ClientMessage): void;

  readMessage(): ClientMessage | undefined;

  getMessages(): ClientMessage[];
}

export class MessageQueue implements ClientMessageQueue {
  private lastReadAt: number = new Date().getTime();
  private readonly messages: ClientMessage[] = [];

  public getLastReadAt(): number {
    return this.lastReadAt;
  }

  public addMessage(message: ClientMessage): void {
    this.messages.push(message);
  }

  public readMessage(): ClientMessage | undefined {
    if (this.messages.length > 0) {
      this.lastReadAt = new Date().getTime();
      return this.messages.shift();
    }

    return undefined;
  }

  public getMessages(): ClientMessage[] {
    return this.messages;
  }
}
