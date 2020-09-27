import http from 'http';

Object.assign(http.Server.prototype, {
  listen: jest.fn(),
});

export = http;
