test("index", () => {
  expect(async () => await import(".")).not.toThrow();
});
