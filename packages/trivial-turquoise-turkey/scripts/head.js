const { lorem } = require("faker");

function head() {
  return `
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>${lorem.sentence()}</title>
      <link rel="shortcut icon" type="image/jpg" href="favicon.ico" />
      <link rel="stylesheet" href="main.css" />
      <link rel="manifest" href="manifest.json" />
      <script async src="main.js" type="module"></script>
      <script async src="serviceWorker.js"></script>
    </head>
  `;
}

module.exports = { head };
