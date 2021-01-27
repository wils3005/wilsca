import { Element } from "./element";

function header(...innerHTML: string[]): string {
  return new Header(...innerHTML).toString();
}
class Header extends Element {
  static tagName = "header";
}

export { Header, header };
