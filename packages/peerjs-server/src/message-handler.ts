import { MessageType } from "./enums";
import { Client } from "./client";
import { IMessage } from "./message";
import { IRealm } from "./realm";
import { Handler } from "./handler";
import { HeartbeatHandler, TransmissionHandler } from "./handlers";
import { IHandlersRegistry, HandlersRegistry } from "./handlers-registry";

export interface IMessageHandler {
  handle(client: Client | undefined, message: IMessage): boolean;
}

export class MessageHandler implements IMessageHandler {
  constructor(
    realm: IRealm,
    private readonly handlersRegistry: IHandlersRegistry = new HandlersRegistry()
  ) {
    const transmissionHandler: Handler = TransmissionHandler({ realm });
    const heartbeatHandler: Handler = HeartbeatHandler;

    const handleTransmission: Handler = (
      client: Client | undefined,
      { type, src, dst, payload }: IMessage
    ): boolean => {
      return transmissionHandler(client, {
        type,
        src,
        dst,
        payload,
      });
    };

    const handleHeartbeat = (client: Client | undefined, message: IMessage) =>
      heartbeatHandler(client, message);

    this.handlersRegistry.registerHandler(
      MessageType.HEARTBEAT,
      handleHeartbeat
    );
    this.handlersRegistry.registerHandler(
      MessageType.OFFER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.ANSWER,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.CANDIDATE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.LEAVE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.EXPIRE,
      handleTransmission
    );
    this.handlersRegistry.registerHandler(
      MessageType.OTHER,
      handleTransmission
    );
  }

  public handle(client: Client | undefined, message: IMessage): boolean {
    return this.handlersRegistry.handle(client, message);
  }
}
