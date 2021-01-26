const { lorem } = require("faker");
const { body } = require("./body");
const { head } = require("./head");

function html() {
  return `
    <html lang="en">
      ${head()}
      ${body()}
    </html>
  `;
}

module.exports = { html };
