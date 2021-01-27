import { Element } from "./element";

function footer(...innerHTML: string[]): string {
  return new Footer(...innerHTML).toString();
}

class Footer extends Element {
  static tagName = "footer";
}

export { Footer, footer };
