import { JSDOM } from "jsdom";
import { body } from "./body";
import { head } from "./head";

function html(): string {
  // return new HTML(...innerHTML).toString();
  const jsdom = new JSDOM("<!DOCTYPE html>");

  jsdom.window.document.querySelector("head")?.appendChild(head());

  return jsdom.serialize();
}

export { html };
