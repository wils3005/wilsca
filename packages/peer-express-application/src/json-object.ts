import * as Zod from "zod";
import JSONValue from "json-value";

type JSONObject = { [index: string]: JSONValue } | JSONValue[];

const JSONObject: Zod.ZodSchema<JSONObject> = Zod.lazy(() => {
  return Zod.union([Zod.record(JSONObject), Zod.array(JSONObject)]);
});

// function parse(u: unknown): JSONObject {
//   return JSONObject.parse(JSON.parse(String(u)));
// }

export default JSONObject;
// export { parse };
