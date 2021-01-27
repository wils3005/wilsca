import { Element } from "./element";

function h2(...innerHTML: string[]): string {
  return new H2(...innerHTML).toString();
}

class H2 extends Element {
  static tagName = "h2";
}

export { H2, h2 };
