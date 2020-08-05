import pino from "pino";

const { PINO_OPTIONS } = process.env;
const logger = pino(getLoggerOptions());

export default logger;

export function getLoggerOptions(): pino.LoggerOptions {
  try {
    return JSON.parse(String(PINO_OPTIONS)) as pino.LoggerOptions;
  } catch (err) {
    console.error(err);
    return {};
  }
}
