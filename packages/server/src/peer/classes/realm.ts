import * as UUID from "uuid";
import Client from "./client";
import Message from "../schemas/message";
import MessageQueue from "./message-queue";

class Realm {
  private readonly clients = new Map<string, Client>();
  private readonly messageQueues = new Map<string, MessageQueue>();

  public getClientsIds(): string[] {
    return [...this.clients.keys()];
  }

  public getClientById(clientId: string): Client | undefined {
    return this.clients.get(clientId);
  }

  public getClientsIdsWithQueue(): string[] {
    return [...this.messageQueues.keys()];
  }

  public setClient(client: Client, id: string): void {
    this.clients.set(id, client);
  }

  public removeClientById(id: string): boolean {
    const client = this.getClientById(id);

    if (!client) return false;

    this.clients.delete(id);

    return true;
  }

  public getMessageQueueById(id: string): MessageQueue | undefined {
    return this.messageQueues.get(id);
  }

  public addMessageToQueue(id: string, message: Message): void {
    if (!this.getMessageQueueById(id)) {
      this.messageQueues.set(id, new MessageQueue());
    }

    this.getMessageQueueById(id)?.addMessage(message);
  }

  public clearMessageQueue(id: string): void {
    this.messageQueues.delete(id);
  }

  public generateClientId(generateClientId?: () => string): string {
    const generateId = generateClientId ? generateClientId : UUID.v4;

    let clientId = generateId();

    while (this.getClientById(clientId)) {
      clientId = generateId();
    }

    return clientId;
  }
}

export default Realm;
