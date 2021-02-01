import "./peer";
import game from "./game";
import log from "./log";

function onLoad(): void {
  log();
}

function onResize(): void {
  log();
  const y = globalThis.innerHeight * 0.875;
  const x = y / 2;
  game.scale.resize(x, y);
}

globalThis.addEventListener("load", onLoad);
globalThis.addEventListener("resize", onResize);

export { onLoad, onResize };
