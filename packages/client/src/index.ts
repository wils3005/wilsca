import { onLoad } from './window';

const { name } = globalThis.constructor;

if (name == 'Window') {
  globalThis.addEventListener('load', onLoad);
}

export {};
