import { JSDOM } from "jsdom";

function defaultHTML() {
  return "<p></p>";
}

function p(html: string = defaultHTML()): DocumentFragment {
  return JSDOM.fragment(html);
}

export { p };
