test("User", () => {
  expect(async () => await import("./User")).not.toThrow();
});
