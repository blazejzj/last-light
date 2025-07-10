import Phaser from "phaser";
import { createPlayer, updatePlayerMovement } from "../player/Player";
import { createPlayerAnimations } from "../player/PlayerAnimations";
import { createCoordText, updateCoordText } from "../ui/CoordText";
import { createToolbar } from "../ui/Toolbar";
import { GameClock } from "../ui/GameClock";
import { PauseMenu } from "../ui/PauseMenu";
import { InventoryUI } from "../ui/Inventory";

export default class GameScene extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    currentDirection!: "up" | "down" | "left" | "right";
    coordText!: Phaser.GameObjects.Text;
    gameTime = 0;
    clock!: GameClock;
    pauseMenu: PauseMenu;
    inventory: InventoryUI;

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

        // ingame clock
        this.clock = new GameClock(this);
        this.clock.setPosition(890, 185);
        this.gameTime = 8 * 60;

        // pause menu
        this.pauseMenu = new PauseMenu(this);
        // listen for ESC -> pause
        this.input.keyboard?.on("keydown-ESC", () => {
            if (this.pauseMenu.container.visible) {
                this.pauseMenu.hide();
                this.physics.resume();
                this.scene.resume();
            } else {
                this.pauseMenu.show();
                this.physics.pause();
            }
        });
        this.pauseMenu.container.setScrollFactor(0);

        // create inventory
        this.inventory = new InventoryUI(this);
        this.input.keyboard?.on("keydown-I", () => {
            this.inventory.toggle();
        });
    }

    update(time: number, delta: number) {
        if (!this.pauseMenu.container.visible && !this.inventory.isOpen) {
            updatePlayerMovement(this.player, this.cursors, this);
        }

        if (this.inventory.isOpen) {
            const cam = this.cameras.main;
            this.inventory.container.x = cam.scrollX + cam.width / 2;
            this.inventory.container.y = cam.scrollY + cam.height / 2;
            this.inventory.overlay.x = cam.scrollX;
            this.inventory.overlay.y = cam.scrollY;
        }

        updateCoordText(this.coordText, this.player);

        // ingame time
        const minutesPerSecond = 1440 / 1200;
        this.gameTime += (delta / 1000) * minutesPerSecond;

        if (this.gameTime >= 1440) {
            this.gameTime = 0;
        }

        const hours = Math.floor(this.gameTime / 60);
        const minutes = Math.floor(this.gameTime % 60);
        this.clock.update(hours, minutes);
    }
}
