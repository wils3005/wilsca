import { doesNotThrow } from "assert";
import sinon from "sinon";
import { test } from "mocha";

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
  // TODO
});

afterEach(() => {
  sinon.restore();
});

test("server", () => {
  doesNotThrow(async () => await import("../src"));
});

test("server.main", async () => {
  const main = (await import("../src")).default;
  doesNotThrow(() => main());
});

test("server.onUnhandledRejection", async () => {
  const { onUnhandledRejection } = await import("../src");
  doesNotThrow(() => onUnhandledRejection());
});
