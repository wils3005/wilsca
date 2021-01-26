const { html } = require("./html");

function index() {
  return `
    <!DOCTYPE html>
    ${html()}
  `;
}

console.log(index());

module.exports = { index };
