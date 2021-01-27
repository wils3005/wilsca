import { Element } from "./element";
import { article } from "./article";
import faker from "faker";
import { footer } from "./footer";
import { h3 } from "./h3";
import { header } from "./header";
import { p } from "./p";

const { lorem } = faker;

function section(...innerHTML: string[]): string {
  return new Section(...innerHTML).toString();
}

class Section extends Element {
  static tagName = "section";

  static innerHTML(): string[] {
    return [
      header(h3(`SECTION HEADER - ${lorem.sentence()}`)),
      article(),
      article(),
      footer(p(`SECTION FOOTER - ${lorem.sentence()}`)),
    ];
  }
}

export { Section, section };
