import https from 'https';

Object.assign(https.Server.prototype, {
  listen: jest.fn(),
});

export = https;
