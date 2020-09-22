const {
  constructor: { name },
  location: { pathname },
} = globalThis;

const timestampRegExp = /\d{2}:\d{2}:\d{2}\.\d{3}/;

function log(error?: Error): void {
  const date = new Date().toJSON();
  const { stack = '' } = new Error();
  const timestamp = (timestampRegExp.exec(date) || [])[0];
  const functionName = (/at (.+) /.exec(stack.split('\n')[2]) || [])[1];
  const message = [timestamp, name, pathname, functionName];
  error ? console.error(...message, error) : console.info(...message);
}

export { log };
