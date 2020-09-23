import stream = require('stream');

Object.assign(stream.Writable.prototype, {
  write: jest.fn(),
});

export = stream;
