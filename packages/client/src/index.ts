import ReactDOM = require('react-dom');
import { App } from './App';
import { log } from './log';

const {
  document,
  constructor: { name },
} = globalThis;

function onLoad(): void {
  log();
  ReactDOM.render(App(), document.getElementById('root'));
}

if (name == 'Window') {
  globalThis.addEventListener('load', onLoad);
}

export { onLoad };
