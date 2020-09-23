import http = require('http');

Object.assign(http.Server.prototype, {
  listen: jest.fn(),
});

export = http;
