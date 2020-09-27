import { addEventListeners, register } from './sw';
import { Element } from './app';
import { log } from './log';
import { render } from 'react-dom';

const { document } = globalThis;

function onLoad(): void {
  log();
  render(Element(), document.getElementById('root'));
  addEventListeners();
  void register();
}

export { onLoad };
