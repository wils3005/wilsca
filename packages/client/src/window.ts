import ReactDOM = require('react-dom');

import { addEventListeners, register } from './sw';
import { Element } from './app';
import { log } from './log';

const { document } = globalThis;

function onLoad(): void {
  log();
  ReactDOM.render(Element(), document.getElementById('root'));
  addEventListeners();
  void register();
}

export { onLoad };
