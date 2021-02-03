//  Based on the Emoji Match game by Tom Miller (https://codepen.io/creativeocean/full/OeKjmp)

import Boot from "./Boot";
import MainGame from "./Game.js";
import MainMenu from "./MainMenu";
import Phaser from "phaser";
import Preloader from "./Preloader.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#008eb0",
  parent: "phaser",
  scene: [Boot, Preloader, MainMenu, MainGame],
};

const game = new Phaser.Game(config);

export { game };
