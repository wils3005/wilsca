import { HTML } from "./html";

class Index {
  constructor() {
    // TODO
  }

  toString() {
    return `
      <!DOCTYPE html>
      ${new HTML().toString()}
    `;
  }
}

console.log(new Index().toString());

export {};
