import { Element } from "./element";
import { Footer } from "./footer";
import { Header } from "./header";
import faker from "faker";

const { internet, lorem, phone } = faker;
const email = internet.email();
const phoneNumber = phone.phoneNumber();
const tel = phoneNumber.replaceAll(/[^\d]/g, "");

class Article extends Element {
  static tagName = "article";

  static innerHTML(): string {
    const header = new Header(
      `<h4>ARTICLE HEADER - ${lorem.sentence()}</h4>`
    ).toString();

    const footer = new Footer(`
      <p>ARTICLE FOOTER - ${lorem.sentence()}</p>
      <address>
        <a href="mailto:${email}">${email}</a><br />
        <a href="tel:+${tel}}">${phoneNumber}</a>
      </address>
    `).toString();

    return `
        ${header}
        <p>PARAGRAPH - ${lorem.paragraphs(10)}</p>
        <p>PARAGRAPH - ${lorem.paragraphs(10)}</p>
        <aside>
          <blockquote>ASIDE: ${lorem.paragraph()}</blockquote>
        </aside>
        ${footer}
      `;
  }
}

export { Article };
