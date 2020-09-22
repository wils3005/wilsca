import stream from 'stream';

Object.assign(stream.Writable.prototype, {
  write: jest.fn(),
});

export = stream;
