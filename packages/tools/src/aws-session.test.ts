// import { readFileSync, writeFileSync } from "fs";
import { doesNotThrow } from "assert";
import { test } from "mocha";
// import { execSync } from "child_process";

// jest.mock("child_process", () => {
//   return {
//     execSync: () => mock<ReturnType<typeof execSync>>(),
//   };
// });

// jest.mock("fs", () => {
//   return {
//     readFileSync: () => mock<ReturnType<typeof readFileSync>>(),
//     writeFileSync: () => mock<ReturnType<typeof writeFileSync>>(),
//   };
// });

test("aws-session", () => {
  doesNotThrow(async () => await import("./aws-session"));
});
