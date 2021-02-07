import * as Zod from "zod";

type JsonValue =
  | { [index: string]: JsonValue }
  | JsonValue[]
  | boolean
  | null
  | number
  | string;

type JsonObject = { [index: string]: JsonValue } | JsonValue[];

const valueSchema: Zod.ZodSchema<JsonValue> = Zod.lazy(() => {
  return Zod.union([
    Zod.record(valueSchema),
    Zod.array(valueSchema),
    Zod.boolean(),
    Zod.null(),
    Zod.number(),
    Zod.string(),
  ]);
});

const objectSchema: Zod.ZodSchema<JsonObject> = Zod.lazy(() => {
  return Zod.union([Zod.record(valueSchema), Zod.array(valueSchema)]);
});

function main(u: unknown): JsonObject {
  return objectSchema.parse(JSON.parse(String(u)));
}

export default main;
