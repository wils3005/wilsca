import { Element } from "./element";
import { Footer } from "./footer";
import { Header } from "./header";
import { Section } from "./section";
import faker from "faker";

const { lorem } = faker;

class Main extends Element {
  static tagName = "main";

  static innerHTML(): string {
    const header = new Header(
      `<h2>MAIN HEADER - ${lorem.sentence()}</h2>`
    ).toString();

    const footer = new Footer(`MAIN FOOTER - ${lorem.sentence()}`).toString();

    return `
      ${header}
      ${new Section().toString()}
      ${new Section().toString()}
      ${footer}
    `;
  }
}

export { Main };
