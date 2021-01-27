import { JSDOM } from "jsdom";
import faker from "faker";

const { lorem } = faker;

function defaultHTML() {
  return `
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>${lorem.sentence()}</title>
    <link rel="shortcut icon" type="image/jpg" href="favicon.ico" />
    <link rel="stylesheet" href="main.css" />
    <link rel="manifest" href="manifest.json" />
    <script async src="main.js" type="module"></script>
    <script async src="sw.js"></script>
  `;
}

function head(html: string = defaultHTML()): DocumentFragment {
  return JSDOM.fragment(html);
}

export { head };
