import * as Zod from "zod";

type JSSONValue =
  | { [index: string]: JSSONValue }
  | JSSONValue[]
  | boolean
  | null
  | number
  | string;

const JSSONValue: Zod.ZodSchema<JSSONValue> = Zod.lazy(() => {
  return Zod.union([
    Zod.record(JSSONValue),
    Zod.array(JSSONValue),
    Zod.boolean(),
    Zod.null(),
    Zod.number(),
    Zod.string(),
  ]);
});

export default JSSONValue;
