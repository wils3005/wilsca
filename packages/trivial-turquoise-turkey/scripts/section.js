const { lorem } = require("faker");
const { article } = require("./article");

function section() {
  return `
    <section>
      <header>
        <h3>SECTION HEADER - ${lorem.sentence()}</h3>
      </header>
      ${article()}
      ${article()}
      <footer>
        <p>SECTION FOOTER - ${lorem.sentence()}</p>
      </footer>
    </section>
  `;
}

module.exports = { section };
