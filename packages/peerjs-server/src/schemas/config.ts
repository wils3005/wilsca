import * as Zod from "zod";

const Config = Zod.object({
  host: Zod.string().optional(),
  port: Zod.number().optional(),
  expire_timeout: Zod.number().optional(),
  alive_timeout: Zod.number().optional(),
  key: Zod.string().optional(),
  path: Zod.string().optional(),
  concurrent_limit: Zod.number().optional(),
  allow_discovery: Zod.boolean().optional(),
  proxied: Zod.union([Zod.boolean(), Zod.string()]).optional(),
  cleanup_out_msgs: Zod.number().optional(),
  ssl: Zod.object({
    key: Zod.string(),
    cert: Zod.string(),
  }).optional(),
  generateClientId: Zod.function(Zod.tuple([]), Zod.string()).optional(),
});

type Config = Zod.infer<typeof Config>;

export default Config;
