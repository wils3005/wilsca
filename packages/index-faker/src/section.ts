import { Article } from "./article";
import { Element } from "./element";
import { Footer } from "./footer";
import { Header } from "./header";
import faker from "faker";

const { lorem } = faker;

class Section extends Element {
  static tagName = "section";

  static innerHTML(): string {
    const header = new Header(
      `<h3>SECTION HEADER - ${lorem.sentence()}</h3>`
    ).toString();

    const footer = new Footer(
      `<p>SECTION FOOTER - ${lorem.sentence()}</p>`
    ).toString();

    return `
      ${header}
      ${new Article().toString()}
      ${new Article().toString()}
      ${footer}
    `;
  }
}

export { Section };
