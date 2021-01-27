import { Element } from "./element";

function aside(...innerHTML: string[]): string {
  return new Aside(...innerHTML).toString();
}

class Aside extends Element {
  static tagName = "aside";
}

export { Aside, aside };
