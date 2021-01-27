import { Element } from "./element";
import faker from "faker";
import { footer } from "./footer";
import { h2 } from "./h2";
import { header } from "./header";
import { section } from "./section";

const { lorem } = faker;

function main(...innerHTML: string[]): string {
  return new Main(...innerHTML).toString();
}

class Main extends Element {
  static tagName = "main";

  static innerHTML(): string[] {
    return [
      header(h2(`MAIN HEADER - ${lorem.sentence()}`)),
      section(),
      section(),
      footer(`MAIN FOOTER - ${lorem.sentence()}`),
    ];
  }
}

export { Main, main };
