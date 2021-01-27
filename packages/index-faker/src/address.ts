import { Element } from "./element";

function address(...innerHTML: string[]): string {
  return new Address(...innerHTML).toString();
}

class Address extends Element {
  static tagName = "address";
}

export { Address, address };
