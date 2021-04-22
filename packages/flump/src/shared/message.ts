import * as zod from "zod";

const RTCSessionDescriptionInit = zod.object({
  sdp: zod.string().optional(),
  type: zod.enum(["answer", "offer", "pranswer", "rollback"]).optional(),
});

type RTCSessionDescriptionInit = zod.infer<typeof RTCSessionDescriptionInit>;

const MessageOptions = zod.object({
  sender: zod.string(),
  recipient: zod.string(),
  ids: zod.array(zod.string()).optional(),
  offer: RTCSessionDescriptionInit.optional(),
  answer: RTCSessionDescriptionInit.optional(),
  candidate: zod.unknown().optional(),
});

type MessageOptions = zod.infer<typeof MessageOptions>;

class Message {
  static parse(data: unknown): Message {
    return new Message(MessageOptions.parse(JSON.parse(String(data))));
  }

  sender: string;

  recipient: string;

  ids?: string[];

  offer?: RTCSessionDescriptionInit;

  answer?: RTCSessionDescriptionInit;

  candidate?: unknown;

  constructor(options: MessageOptions) {
    this.sender = options.sender;
    this.recipient = options.recipient;
    this.ids = options.ids;
    this.offer = options.offer;
    this.answer = options.answer;
    this.candidate = options.candidate;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export { Message, MessageOptions, RTCSessionDescriptionInit };
