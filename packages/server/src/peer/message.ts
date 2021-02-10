import * as Zod from "zod";
import MessageType from "./message-type";

const IMessage = Zod.object({
  type: Zod.nativeEnum(MessageType),
  src: Zod.string().optional(),
  dst: Zod.string().optional(),
  payload: Zod.unknown().optional(),
});

type IMessage = Zod.infer<typeof IMessage>;

export default IMessage;
