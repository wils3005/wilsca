import * as z from "zod";

const {
  constructor: { name },
  location: { pathname },
} = globalThis;

function functionName(s: string): string {
  const r = /at (.+) /;
  const a = s.split("\n");
  return String(r.exec(a[2]));
}

function log(e?: Error): void {
  const date = new Date().toJSON();
  const stack = String(new Error().stack);
  const message = [timestamp(date), name, pathname, functionName(stack)];
  e ? console.error(...message, e) : console.info(...message);
}

function timestamp(s: string): string {
  return z
    .string()
    .refine((s) => /\d{2}:\d{2}:\d{2}\.\d{3}/.test(s))
    .parse(s);
}

export { functionName, log, timestamp };
