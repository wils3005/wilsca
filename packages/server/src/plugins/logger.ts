import { loggerOptions } from "../env";
import pino from "pino";

const logger = pino(loggerOptions);

export default logger;
