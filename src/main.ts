import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

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
    plugins: {
        scene: [
            {
                key: "rexUI",
                plugin: RexUIPlugin,
                mapping: "rexUI",
            },
        ],
    },
};

new Phaser.Game(config);
