import pino from "pino";

const { PINO_OPTIONS = "{}" } = process.env;
const loggerOptions = JSON.parse(String(PINO_OPTIONS)) as pino.LoggerOptions;
const logger = pino(loggerOptions);

export default logger;
