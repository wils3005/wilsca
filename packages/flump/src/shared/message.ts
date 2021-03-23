import * as Zod from "zod";

const RTCSessionDescriptionInit = Zod.object({
  sdp: Zod.string().optional(),
  type: Zod.enum(["answer", "offer", "pranswer", "rollback"]).optional(),
});

type RTCSessionDescriptionInit = Zod.infer<typeof RTCSessionDescriptionInit>;

const MessageOptions = Zod.object({
  sender: Zod.string(),
  recipient: Zod.string(),
  ids: Zod.array(Zod.string()).optional(),
  offer: RTCSessionDescriptionInit.optional(),
  answer: RTCSessionDescriptionInit.optional(),
  candidate: Zod.unknown().optional(),
});

type MessageOptions = Zod.infer<typeof MessageOptions>;

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
