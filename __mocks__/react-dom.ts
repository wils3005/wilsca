import ReactDOM from 'react-dom';

Object.assign(ReactDOM, {
  render: jest.fn(),
});

export = ReactDOM;
