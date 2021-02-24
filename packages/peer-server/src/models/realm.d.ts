import { IClient } from "./client";
import { IMessage } from "./message";
import { IMessageQueue } from "./messageQueue";
export interface IRealm {
    getClientsIds(): string[];
    getClientById(clientId: string): IClient | undefined;
    getClientsIdsWithQueue(): string[];
    setClient(client: IClient, id: string): void;
    removeClientById(id: string): boolean;
    getMessageQueueById(id: string): IMessageQueue | undefined;
    addMessageToQueue(id: string, message: IMessage): void;
    clearMessageQueue(id: string): void;
    generateClientId(generateClientId?: () => string): string;
}
export declare class Realm implements IRealm {
    private readonly clients;
    private readonly messageQueues;
    getClientsIds(): string[];
    getClientById(clientId: string): IClient | undefined;
    getClientsIdsWithQueue(): string[];
    setClient(client: IClient, id: string): void;
    removeClientById(id: string): boolean;
    getMessageQueueById(id: string): IMessageQueue | undefined;
    addMessageToQueue(id: string, message: IMessage): void;
    clearMessageQueue(id: string): void;
    generateClientId(generateClientId?: () => string): string;
}
