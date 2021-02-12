import * as Zod from "zod";

const Config = Zod.object({
  host: Zod.string(),
  port: Zod.number(),
  expireTimeout: Zod.number(),
  aliveTimeout: Zod.number(),
  key: Zod.string().optional(),
  path: Zod.string(),
  concurrentLimit: Zod.number(),
  allowDiscovery: Zod.boolean(),
  cleanupOutMessages: Zod.number(),
  ssl: Zod.object({ key: Zod.string(), cert: Zod.string() }).optional(),
  generateClientId: Zod.function(Zod.tuple([]), Zod.string()).optional(),
});

type Config = Zod.infer<typeof Config>;

export default Config;
