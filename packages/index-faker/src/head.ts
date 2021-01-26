import { Element } from "./element";
import faker from "faker";

const { lorem } = faker;

class Head extends Element {
  static tagName = "head";

  static innerHTML(): string {
    const title = lorem.sentence();

    return `
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>${title}</title>
      <link rel="shortcut icon" type="image/jpg" href="favicon.ico" />
      <link rel="stylesheet" href="main.css" />
      <link rel="manifest" href="manifest.json" />
      <script async src="main.js" type="module"></script>
      <script async src="sw.js"></script>
    `;
  }
}

export { Head };
