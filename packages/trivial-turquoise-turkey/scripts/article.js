const { internet, lorem, phone } = require("faker");
const { footer } = require("./footer");
const { header } = require("./header");
const email = internet.email();
const phoneNumber = phone.phoneNumber();
const tel = phoneNumber.replaceAll(/[^\d]/g, "");

function article() {
  return `
    <article>
      ${header(`<h4>ARTICLE HEADER - ${lorem.sentence()}</h4>`)}
      <p>PARAGRAPH - ${lorem.paragraphs(10)}</p>
      <p>PARAGRAPH - ${lorem.paragraphs(10)}</p>
      <aside>
        <blockquote>ASIDE: ${lorem.paragraph()}</blockquote>
      </aside>
      ${footer(`
        <p>ARTICLE FOOTER - ${lorem.sentence()}</p>
        <address>
          <a href="mailto:${email}">${email}</a><br />
          <a href="tel:+${tel}}">${phoneNumber}</a>
        </address>
      `)}
    </article>
  `;
}

module.exports = { article };
