import { pino, zod as z } from "@wilsjs/dependencies";

const loggerOptions = z
  .record(z.unknown())
  .parse(JSON.parse(z.string().parse(process.env.PINO_OPTIONS)));

const logger = pino(loggerOptions);

export default logger;
