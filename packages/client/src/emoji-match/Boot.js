import { Scene } from "phaser";

export default class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  create() {
    this.registry.set("highscore", 0);
    this.scene.start("Preloader");
  }
}
