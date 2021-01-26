import { Body } from "./body";
import { Element } from "./element";
import { Head } from "./head";

class HTML extends Element {
  static tagName = "html";

  static innerHTML(): string {
    return `
      ${new Head().toString()}
      ${new Body().toString()}
    `;
  }
}

export { HTML };
