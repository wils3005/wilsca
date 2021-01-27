import { Element } from "./element";

function h1(...innerHTML: string[]): string {
  return new H1(...innerHTML).toString();
}

class H1 extends Element {
  static tagName = "h1";
}

export { H1, h1 };
