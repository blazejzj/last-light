import Phaser from "phaser";
import { createPlayer, updatePlayerMovement } from "../player/Player";
import { createPlayerAnimations } from "../player/PlayerAnimations";
import { createCoordText, updateCoordText } from "../ui/CoordText";
import { createToolbar } from "../ui/Toolbar";

export default class GameScene extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    currentDirection!: "up" | "down" | "left" | "right";
    coordText!: Phaser.GameObjects.Text;

    preload() {
        this.load.spritesheet("playerUp", "assets/playerUp.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("playerDown", "assets/playerDown.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("playerLeft", "assets/playerLeft.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("playerRight", "assets/playerRight.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("toolbar", "assets/toolbar.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image("tiles", "assets/firsttilemap.png");
        this.load.tilemapTiledJSON("map", "assets/map.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset-first-test", "tiles");
        map.createLayer("Tile Layer 1", tileset, 0, 0);
        const rocksLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);
        rocksLayer.setCollisionByProperty({ collides: true });

        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        // player
        this.player = createPlayer(this);
        this.currentDirection = "down";
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, rocksLayer);

        // camera
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        // animations
        createPlayerAnimations(this);

        // coordinates show
        this.coordText = createCoordText(this);
        this.coordText.setDepth(1000);
        this.coordText.setPosition(320, 180);

        // toolbar
        createToolbar(this);
    }

    update() {
        updatePlayerMovement(this.player, this.cursors, this);
        updateCoordText(this.coordText, this.player);
    }
}
