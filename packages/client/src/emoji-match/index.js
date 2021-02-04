//  Based on the Emoji Match game by Tom Miller (https://codepen.io/creativeocean/full/OeKjmp)

import { AUTO, Game } from "phaser";
import Boot from "./Boot.js";
import MainGame from "./Game.js";
import MainMenu from "./MainMenu.js";
import Preloader from "./Preloader.js";

const config = {
  type: AUTO,
  width: 600,
  height: 600,
  backgroundColor: "#008eb0",
  parent: "phaser",
  scene: [Boot, Preloader, MainMenu, MainGame],
};

const game = new Game(config);

export { game };
