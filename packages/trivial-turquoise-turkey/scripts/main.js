const { lorem } = require("faker");
const { section } = require("./section");

function main() {
  return `
    <main>
      <header>
        <h2>MAIN HEADER - ${lorem.sentence()}</h2>
      </header>
      ${section()}
      ${section()}
      <footer>MAIN FOOTER - ${lorem.sentence()}</footer>
    </main>
  `;
}

module.exports = { main };
