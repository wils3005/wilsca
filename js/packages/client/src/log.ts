function log(error?: Error): void {
  const date = new Date().toJSON();
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(date) || [];
  const timestamp = a[0];
  const { name: globalThisType } = globalThis.constructor;
  const { pathname } = location;
  const stack = new Error().stack || "";
  const aa = /at (.+) /.exec(stack.split("\n")[2]) || [];
  const functionName = aa[1];
  const message = [timestamp, globalThisType, pathname, functionName];

  if (error) {
    console.error(...message, error);
  } else {
    console.info(...message);
  }
}

export default log;
