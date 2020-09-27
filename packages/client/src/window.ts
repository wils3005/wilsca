import { addEventListeners, register } from './sw';
import { asdf } from './app';
import { log } from './log';

function onLoad(): void {
  log();
  asdf();
  addEventListeners();
  void register();
}

export { onLoad };
