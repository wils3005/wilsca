import * as Zod from "zod";

class MessageEventData {
  static schema = Zod.object({});

  event: MessageEvent<unknown>;
  parsedData: Zod.infer<typeof MessageEventData.schema>;

  constructor(event: MessageEvent<unknown>) {
    this.event = event;
    this.parsedData = MessageEventData.schema.parse(
      JSON.parse(String(event.data))
    );
  }
}

export default MessageEventData;
