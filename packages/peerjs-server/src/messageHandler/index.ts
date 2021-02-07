import { MessageType } from "../enums";
import { Client } from "../models/client";
import { ClientMessage } from "../models/message";
import { IRealm } from "../models/realm";
import { Handler } from "./handler";
import { HeartbeatHandler, TransmissionHandler } from "./handlers";
import { IHandlersRegistry, HandlersRegistry } from "./handlersRegistry";

export interface ClientMessageHandler {
  handle(client: Client | undefined, message: ClientMessage): boolean;
}

export class MessageHandler implements ClientMessageHandler {
  constructor(
    realm: IRealm,
    private readonly handlersRegistry: IHandlersRegistry = new HandlersRegistry()
  ) {
    const transmissionHandler: Handler = TransmissionHandler({ realm });
    const heartbeatHandler: Handler = HeartbeatHandler;

    const handleTransmission: Handler = (
      client: Client | undefined,
      { type, src, dst, payload }: ClientMessage
    ): boolean => {
      return transmissionHandler(client, {
        type,
        src,
        dst,
        payload,
      });
    };

    const handleHeartbeat = (
      client: Client | undefined,
      message: ClientMessage
    ): boolean => heartbeatHandler(client, message);

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
  }

  public handle(client: Client | undefined, message: ClientMessage): boolean {
    return this.handlersRegistry.handle(client, message);
  }
}
