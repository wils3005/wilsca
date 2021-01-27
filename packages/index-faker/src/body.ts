import { Element } from "./element";
import faker from "faker";
import { footer } from "./footer";
import { h1 } from "./h1";
import { header } from "./header";
import { main } from "./main";
import { p } from "./p";

const { lorem } = faker;

function body(...innerHTML: string[]): string {
  return new Body(...innerHTML).toString();
}

class Body extends Element {
  static tagName = "body";

  static innerHTML(): string[] {
    return [
      header(h1(`BODY HEADER - ${lorem.sentence()}`)),
      main(),
      footer(p(`BODY FOOTER - ${lorem.sentence()}`)),
    ];
  }
}

export { Body, body };
