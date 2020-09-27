import {
  ZodSchema,
  array,
  boolean,
  lazy,
  record,
  string,
  union,
  null as znull,
  number as znumber,
} from 'zod';

type JsonValue = JsonObject | boolean | null | number | string;
type JsonObject = { [index: string]: JsonValue } | JsonValue[];

const jsonValue: ZodSchema<JsonValue> = lazy(() => {
  return union([
    record(jsonValue),
    array(jsonValue),
    boolean(),
    znull(),
    znumber(),
    string(),
  ]);
});

function json(): ZodSchema<JsonObject> {
  return lazy(() => union([record(jsonValue), array(jsonValue)]));
}

export { json };
export * from 'zod';
