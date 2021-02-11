import * as UUID from "uuid";
import Client from "./web-socket-wrapper";
import Message from "./message";
import MessageQueue from "./message-queue";

// receives Client, mapped to id
// creates MessageQueue, mapped to id
class Realm {
  clients = new Map<string, Client>();
  messageQueues = new Map<string, MessageQueue>();

  getClientsIds(): string[] {
    return [...this.clients.keys()];
  }

  getClientById(clientId: string): Client | undefined {
    return this.clients.get(clientId);
  }

  getClientsIdsWithQueue(): string[] {
    return [...this.messageQueues.keys()];
  }

  setClient(client: Client, id: string): void {
    this.clients.set(id, client);
  }

  removeClientById(id: string): boolean {
    const client = this.getClientById(id);

    if (!client) return false;

    this.clients.delete(id);

    return true;
  }

  getMessageQueueById(id: string): MessageQueue | undefined {
    return this.messageQueues.get(id);
  }

  addMessageToQueue(id: string, message: Message): void {
    if (!this.getMessageQueueById(id)) {
      this.messageQueues.set(id, new MessageQueue());
    }

    this.getMessageQueueById(id)?.addMessage(message);
  }

  clearMessageQueue(id: string): void {
    this.messageQueues.delete(id);
  }

  generateClientId(generateClientId?: () => string): string {
    const generateId = generateClientId ? generateClientId : UUID.v4;

    let clientId = generateId();

    while (this.getClientById(clientId)) {
      clientId = generateId();
    }

    return clientId;
  }
}

export default Realm;
