const {
  constructor: { name },
  location: { pathname },
} = globalThis;

function log(error?: Error): void {
  const { stack } = new Error();
  const a = stack?.split("\n") || [];
  const s = a[1];

  const message = {
    globalThis: name,
    location: pathname,
    function: String(/at (.+) /.exec(s)?.pop()),
  };

  error ? console.error({ ...message, error }) : console.info(message);
}

export { log };
