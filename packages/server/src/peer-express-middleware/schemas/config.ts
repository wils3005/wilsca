import * as Zod from "zod";

const Config = Zod.object({
  host: Zod.string(),
  port: Zod.number(),
  expire_timeout: Zod.number(),
  alive_timeout: Zod.number(),
  key: Zod.string(),
  path: Zod.string(),
  concurrent_limit: Zod.number(),
  allow_discovery: Zod.boolean(),
  proxied: Zod.union([Zod.boolean(), Zod.string()]),
  cleanup_out_msgs: Zod.number(),
  ssl: Zod.object({ key: Zod.string(), cert: Zod.string() }).optional(),
  generateClientId: Zod.function(Zod.tuple([]), Zod.string()).optional(),
});

type Config = Zod.infer<typeof Config>;

export default Config;
