import uuidv4 from "uuid/v4";
import { Client } from "./client";
import { ClientMessage } from "./message";
import { ClientMessageQueue, MessageQueue } from "./messageQueue";

export interface IRealm {
  getClientsIds(): string[];

  getClientById(clientId: string): Client | undefined;

  getClientsIdsWithQueue(): string[];

  setClient(client: Client, id: string): void;

  removeClientById(id: string): boolean;

  getMessageQueueById(id: string): ClientMessageQueue | undefined;

  addMessageToQueue(id: string, message: ClientMessage): void;

  clearMessageQueue(id: string): void;

  generateClientId(generateClientId?: () => string): string;
}

export class Realm implements IRealm {
  private readonly clients: Map<string, Client> = new Map();
  private readonly messageQueues: Map<string, ClientMessageQueue> = new Map();

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

  public getMessageQueueById(id: string): ClientMessageQueue | undefined {
    return this.messageQueues.get(id);
  }

  public addMessageToQueue(id: string, message: ClientMessage): void {
    if (!this.getMessageQueueById(id)) {
      this.messageQueues.set(id, new MessageQueue());
    }

    this.getMessageQueueById(id)?.addMessage(message);
  }

  public clearMessageQueue(id: string): void {
    this.messageQueues.delete(id);
  }

  public generateClientId(generateClientId?: () => string): string {
    const generateId = generateClientId ? generateClientId : uuidv4;

    let clientId = generateId();

    while (this.getClientById(clientId)) {
      clientId = generateId();
    }

    return clientId;
  }
}
