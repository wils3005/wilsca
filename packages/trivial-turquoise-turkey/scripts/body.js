const { lorem } = require("faker");
const { main } = require("./main");

function body() {
  return `
    <body>
      <header>
        <h1>BODY HEADER - ${lorem.sentence()}</h1>
      </header>
      ${main()}
      <footer>
        <p>BODY FOOTER - ${lorem.sentence()}</p>
      </footer>
    </body>
  `;
}

module.exports = { body };
