import * as Zod from "zod";

const IConfig = Zod.object({
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

type IConfig = Zod.infer<typeof IConfig>;

// export interface IConfig {
//   readonly host: string;
//   readonly port: number;
//   readonly expire_timeout: number;
//   readonly alive_timeout: number;
//   readonly key: string;
//   readonly path: string;
//   readonly concurrent_limit: number;
//   readonly allow_discovery: boolean;
//   readonly proxied: boolean | string;
//   readonly cleanup_out_msgs: number;
//   readonly ssl?: {
//     key: string;
//     cert: string;
//   };
//   readonly generateClientId?: () => string;
// }

const defaultConfig: IConfig = {
  host: "::",
  port: 9000,
  expire_timeout: 5000,
  alive_timeout: 60000,
  key: "peerjs",
  path: "/",
  concurrent_limit: 5000,
  allow_discovery: false,
  proxied: false,
  cleanup_out_msgs: 1000,
};

export default defaultConfig;
export { IConfig };
