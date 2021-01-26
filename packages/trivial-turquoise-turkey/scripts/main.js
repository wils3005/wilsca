const { lorem } = require("faker");
const { section } = require("./section");
const { footer } = require("./footer");
const { header } = require("./header");

function main() {
  return `
    <main>
      ${header(`<h2>MAIN HEADER - ${lorem.sentence()}</h2>`)}
      ${section()}
      ${section()}
      ${footer(`MAIN FOOTER - ${lorem.sentence()}`)}
    </main>
  `;
}

module.exports = { main };
