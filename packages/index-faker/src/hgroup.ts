import { Element } from "./element";

function hgroup(...innerHTML: string[]): string {
  return new HGroup(...innerHTML).toString();
}

class HGroup extends Element {
  static tagName = "hgroup";
}

export { HGroup, hgroup };
