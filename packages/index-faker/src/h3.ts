import { Element } from "./element";

function h3(...innerHTML: string[]): string {
  return new H3(...innerHTML).toString();
}

class H3 extends Element {
  static tagName = "h3";
}

export { H3, h3 };
