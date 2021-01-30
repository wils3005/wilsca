import "phaser";

class Scene extends Phaser.Scene {
  constructor() {
    super("@wilsjs/phaser");
  }

  preload(): void {
    // this.load.image("logo", "assets/phaser3-logo.png");
    // this.load.image("libs", "assets/libs.png");
  }

  create(): void {
    this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);

    // this.add.image(400, 300, "libs");

    // const logo = this.add.image(400, 70, "logo");

    // this.tweens.add({
    //   targets: logo,
    //   y: 350,
    //   duration: 1500,
    //   ease: "Sine.inOut",
    //   yoyo: true,
    //   repeat: -1,
    // });
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

export { Scene };
