const {
  constructor: { name },
  location: { pathname },
} = globalThis;

function log(error) {
  const message = {
    globalThis: name,
    location: pathname,
    function: String(/at (.+) /.exec(new Error().stack.split("\n")[1]).pop()),
  };

  error ? console.error({ ...message, error }) : console.info(message);
}

export { log };
