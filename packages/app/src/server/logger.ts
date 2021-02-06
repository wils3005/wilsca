import Pino from "pino";

function main(): Pino.Logger {
  const logger = Pino();
  return logger;
}

export default main;
