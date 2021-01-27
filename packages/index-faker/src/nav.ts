import { Element } from "./element";

function nav(...innerHTML: string[]): string {
  return new Nav(...innerHTML).toString();
}

class Nav extends Element {
  static tagName = "nav";
}

export { Nav, nav };
