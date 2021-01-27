import { Element } from "./element";

function h4(...innerHTML: string[]): string {
  return new H4(...innerHTML).toString();
}

class H4 extends Element {
  static tagName = "h4";
}

export { H4, h4 };
