import Phaser from "phaser";
import GameScene from "./scenes/GameScene";

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: "#222",
    pixelArt: true,
    parent: "app",
    physics: {
        default: "arcade",
        arcade: { debug: false },
    },
    scene: [GameScene],
};

new Phaser.Game(config);
