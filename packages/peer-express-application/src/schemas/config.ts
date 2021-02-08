import * as Zod from "zod";

// interface Config {
//   host: string;
//   port: number;
//   expireTimeout: number;
//   aliveTimeout: number;
//   key: string;
//   path: string;
//   concurrentLimit: number;
//   allowDiscovery: boolean;
//   proxied: boolean | string;
//   cleanupOutMessages: number;
//   ssl?: {
//     key: string;
//     cert: string;
//   };
//   generateClientId?: () => string;
// }

const Config = Zod.object({
  host: Zod.string(),
  port: Zod.number(),
  expireTimeout: Zod.number(),
  aliveTimeout: Zod.number(),
  key: Zod.string(),
  path: Zod.string(),
  concurrentLimit: Zod.number(),
  allowDiscovery: Zod.boolean(),
  proxied: Zod.union([Zod.boolean(), Zod.string()]),
  cleanupOutMessages: Zod.number(),
  ssl: Zod.object({}).optional(),
  generateClientId: Zod.function(Zod.tuple([]), Zod.string()).optional(),
}).strict();

type Config = Zod.infer<typeof Config>;

export default Config;
