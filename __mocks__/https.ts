import https = require('https');

Object.assign(https.Server.prototype, {
  listen: jest.fn(),
});

export = https;
