import "phaser";
import "./game";
import { log } from "./log";

class Scene extends Phaser.Scene {
  constructor() {
    super("@wilsjs/phaser");
  }

  preload(): void {
    // TODO
  }

  create(): void {
    // TODO
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  parent: "main",
  scene: Scene,
};

new Phaser.Game(config);

function onWindowLoad(): void {
  log();
}

globalThis.addEventListener("load", onWindowLoad);

export { onWindowLoad };
