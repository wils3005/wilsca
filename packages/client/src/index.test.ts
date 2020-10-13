import { JSDOM } from "jsdom";
import { doesNotThrow } from "assert";
import sinon from "sinon";
import { test } from "mocha";

const jsdom = new JSDOM();

function onUnhandledRejection(reason: Error): void {
  const r = /(node_modules)|(internal\/modules\/cjs\/(helpers|loader)\.js)/;

  const stack = String(reason.stack)
    .split("\n")
    .filter((s) => !r.test(s))
    .join("\n");

  process.stderr.write(`${"#".repeat(80)}\n${stack}\n\n`);
}

process.on("unhandledRejection", onUnhandledRejection);

// beforeEach(() => {
//   Object.assign(globalThis, {
//     constructor: { name: "" },
//     document: {
//       getElementById: sinon.fake(),
//     },
//     location: { pathname: "/" },
//   });
// });

beforeEach(() => {
  Object.assign(globalThis, jsdom.window);
});

afterEach(() => {
  sinon.restore();
});

test("client", () => {
  doesNotThrow(async () => await import("."));
});

test("does not throw", async () => {
  const { Element } = await import(".");
  doesNotThrow(() => Element());
});

test("does not throw", async () => {
  const { onLoad } = await import(".");
  doesNotThrow(() => onLoad());
});
