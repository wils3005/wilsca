import * as Zod from "zod";

const MessageType = Zod.enum([
  "ANSWER",
  "CANDIDATE",
  "ERROR",
  "EXPIRE",
  "HEARTBEAT",
  "ID_TAKEN",
  "LEAVE",
  "OFFER",
  "OPEN",
]);

type MessageType = Zod.infer<typeof MessageType>;

export default MessageType;
