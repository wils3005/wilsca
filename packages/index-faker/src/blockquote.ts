import { Element } from "./element";

function blockquote(...innerHTML: string[]): string {
  return new Blockquote(...innerHTML).toString();
}

class Blockquote extends Element {
  static tagName = "blockquote";
}

export { Blockquote, blockquote };
