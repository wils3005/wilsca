import * as z from "zod";
import Phaser from "phaser";

class MainMenu extends Phaser.Scene {
  music: unknown;

  constructor() {
    super("MainMenu");

    this.music;
  }

  create(): void {
    const background = this.add.image(400, 300, "background");

    this.tweens.add({
      targets: background,
      alpha: { from: 0, to: 1 },
      duration: 1000,
    });

    const fontStyle = {
      fontFamily: "Arial",
      fontSize: 48,
      color: "#ffffff",
      fontStyle: "bold",
      padding: 16,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 2,
        offsetY: 2,
        blur: 4,
      },
    };

    this.add.text(
      20,
      20,
      `High Score: ${String(this.registry.get("highscore"))}`,
      z.instanceof(Phaser.GameObjects.TextStyle).parse(fontStyle)
    );

    const logo = this.add.image(400, -200, "logo");

    if (!this.music) {
      this.music = this.sound.play("music", { loop: true });
    }

    this.tweens.add({
      targets: logo,
      y: 300,
      ease: "bounce.out",
      duration: 1200,
    });

    this.input.once("pointerdown", () => {
      this.scene.start("MainGame");
    });
  }
}

export default MainMenu;
