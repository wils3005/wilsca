import Message from "./message";

class MessageQueue {
  lastReadAt: number = new Date().getTime();
  messages: Message[] = [];

  getLastReadAt(): number {
    return this.lastReadAt;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  readMessage(): Message | undefined {
    if (this.messages.length > 0) {
      this.lastReadAt = new Date().getTime();
      return this.messages.shift();
    }

    return undefined;
  }

  getMessages(): Message[] {
    return this.messages;
  }
}

export default MessageQueue;
