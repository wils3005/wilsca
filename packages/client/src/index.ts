import { App } from './App';
import ReactDOM from 'react-dom';
import { log } from './log';

const {
  document,
  constructor: { name },
} = globalThis;

function onLoad(): void {
  log();
  ReactDOM.render(App(), document.getElementById('root'));
}

export { onLoad };

if (name == 'Window') {
  globalThis.addEventListener('load', onLoad);
}
