import Pino from "pino";

function main(): Pino.Logger {
  const loggerOptions: Pino.LoggerOptions = {
    redact: {
      paths: ["client.socket"],
    },
  };

  const logger = Pino(loggerOptions);
  return logger;
}

export default main;
