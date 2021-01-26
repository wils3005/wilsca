import { Element } from "./element";
import { Footer } from "./footer";
import { Header } from "./header";
import { Main } from "./main";
import faker from "faker";

const { lorem } = faker;

class Body extends Element {
  static tagName = "body";

  static innerHTML(): string {
    const header = new Header(
      `<h1>BODY HEADER - ${lorem.sentence()}</h1>`
    ).toString();

    const footer = new Footer(
      `<p>BODY FOOTER - ${lorem.sentence()}</p>`
    ).toString();

    return `
      ${header}
      ${new Main().toString()}
      ${footer}
    `;
  }
}

export { Body };
