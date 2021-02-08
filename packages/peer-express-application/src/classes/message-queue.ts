import ClientMessage from "schemas/client-message";

class MessageQueue {
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

export default MessageQueue;
