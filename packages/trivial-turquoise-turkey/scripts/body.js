const { lorem } = require("faker");
const { main } = require("./main");
const { footer } = require("./footer");
const { header } = require("./header");

function body() {
  return `
    <body>
      ${header(`<h1>BODY HEADER - ${lorem.sentence()}</h1>`)}
      ${main()}
      ${footer(`<p>BODY FOOTER - ${lorem.sentence()}</p>`)}
    </body>
  `;
}

module.exports = { body };
