import Message from "./schemas/message";

class MessageQueue {
  private lastReadAt: number = new Date().getTime();
  private readonly messages: Message[] = [];

  public getLastReadAt(): number {
    return this.lastReadAt;
  }

  public addMessage(message: Message): void {
    this.messages.push(message);
  }

  public readMessage(): Message | undefined {
    if (this.messages.length > 0) {
      this.lastReadAt = new Date().getTime();
      return this.messages.shift();
    }

    return undefined;
  }

  public getMessages(): Message[] {
    return this.messages;
  }
}

export default MessageQueue;
