const { lorem } = require("faker");
const { article } = require("./article");
const { footer } = require("./footer");
const { header } = require("./header");

function section() {
  return `
    <section>
      ${header(`<h3>SECTION HEADER - ${lorem.sentence()}</h3>`)}
      ${article()}
      ${article()}
      ${footer(`<p>SECTION FOOTER - ${lorem.sentence()}</p>`)}
    </section>
  `;
}

module.exports = { section };
