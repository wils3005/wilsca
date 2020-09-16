function log(error?: Error): void {
  const date = new Date().toJSON();
  const { stack = "" } = new Error();

  const timestamp = (/\d{2}:\d{2}:\d{2}\.\d{3}/.exec(date) || [])[0];
  const { name: globalThisType } = globalThis.constructor;
  const { pathname } = globalThis.location;
  const functionName = (/at (.+) /.exec(stack.split("\n")[2]) || [])[1];

  const message = [timestamp, globalThisType, pathname, functionName];

  error ? console.error(...message, error) : console.info(...message);
}

export default log;
