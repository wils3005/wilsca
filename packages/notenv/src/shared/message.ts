import * as Zod from "zod";

const MessageOptions = Zod.record(Zod.array(Zod.string()));

type MessageOptions = Zod.infer<typeof MessageOptions>;

class Message {
  static parse(data: unknown): Message {
    return new Message(MessageOptions.parse(JSON.parse(String(data))));
  }

  clusters?: string[];

  namespaces?: string[];

  services?: string[];

  names?: string[];

  values?: string[];

  entries?: string[];

  constructor(options: MessageOptions) {
    this.clusters = options.clusters;
    this.namespaces = options.namespaces;
    this.services = options.services;
    this.names = options.names;
    this.values = options.values;
    this.entries = options.entries;
  }

  toString(): string {
    return JSON.stringify(this);
  }
}

export { Message, MessageOptions };
