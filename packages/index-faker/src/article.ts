import { Element } from "./element";
import { a } from "./a";
import { address } from "./address";
import { aside } from "./aside";
import { blockquote } from "./blockquote";
import faker from "faker";
import { footer } from "./footer";
import { h4 } from "./h4";
import { header } from "./header";
import { p } from "./p";

const { internet, lorem, phone } = faker;

function article(...innerHTML: string[]): string {
  return new Article(...innerHTML).toString();
}

class Article extends Element {
  static tagName = "article";

  static innerHTML(): string[] {
    return [
      header(h4(`ARTICLE HEADER - ${lorem.sentence()}`)),
      p(`PARAGRAPH - ${lorem.paragraphs(10)}`),
      p(`PARAGRAPH - ${lorem.paragraphs(10)}`),
      aside(blockquote(`ASIDE: ${lorem.paragraph()}`)),
      footer(
        p(`ARTICLE FOOTER - ${lorem.sentence()}`),
        address(a(internet.email()), "<br />", a(phone.phoneNumber()))
      ),
    ];
  }
}

export { Article, article };
