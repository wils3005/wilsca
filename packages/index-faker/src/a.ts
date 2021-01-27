import { Element } from "./element";

function a(...innerHTML: string[]): string {
  return new A(...innerHTML).toString();
}

class A extends Element {
  static tagName = "a";
}

export { A, a };
