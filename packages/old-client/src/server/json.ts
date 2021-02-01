import * as z from "zod";

type JsonValue =
  | { [index: string]: JsonValue }
  | JsonValue[]
  | boolean
  | null
  | number
  | string;

type JsonObject = { [index: string]: JsonValue } | JsonValue[];

const jsonValue: z.ZodSchema<JsonValue> = z.lazy(getter);

function getter(): z.ZodTypeAny {
  return z.union([
    z.record(jsonValue),
    z.array(jsonValue),
    z.boolean(),
    z.null(),
    z.number(),
    z.string(),
  ]);
}

function main(): z.ZodSchema<JsonObject> {
  return z.lazy(() => z.union([z.record(jsonValue), z.array(jsonValue)]));
}

export default main;
export { getter };
