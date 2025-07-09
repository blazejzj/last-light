import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    currentDirection!: "up" | "down" | "left" | "right";
    coordText!: Phaser.GameObjects.Text;

    constructor() {
        super("GameScene");
    }

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

        this.load.image("tiles", "assets/firsttilemap.png");
        this.load.tilemapTiledJSON("map", "assets/map.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset-first-test", "tiles");
        const groundLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
        const rocksLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);
        rocksLayer.setCollisionByProperty({ collides: true });

        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        this.player = this.physics.add.sprite(32 * 10, 32 * 10, "playerDown");
        this.currentDirection = "down";
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, rocksLayer);

        // camera on the player
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: "walkRight",
            frames: this.anims.generateFrameNumbers("playerRight", {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "walkUp",
            frames: this.anims.generateFrameNumbers("playerUp", {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "walkDown",
            frames: this.anims.generateFrameNumbers("playerDown", {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "walkLeft",
            frames: this.anims.generateFrameNumbers("playerLeft", {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        });

        this.coordText = this.add.text(16, 16, "", {
            font: "12px helvetica",
        });
        this.coordText.setScrollFactor(0);
        this.coordText.setDepth(1000);
        this.coordText.setPosition(320, 180);
    }

    update() {
        const speed = 120;
        this.player.setVelocity(0);

        let newDirection = this.currentDirection;
        let isMoving = false;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            newDirection = "left";
            isMoving = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            newDirection = "right";
            isMoving = true;
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            newDirection = "up";
            isMoving = true;
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
            newDirection = "down";
            isMoving = true;
        }

        if (newDirection !== this.currentDirection) {
            this.currentDirection = newDirection;
            switch (newDirection) {
                case "up":
                    this.player.anims.stop();
                    this.player.setTexture("playerUp");
                    break;
                case "down":
                    this.player.anims.stop();
                    this.player.setTexture("playerDown");
                    break;
                case "left":
                    this.player.anims.stop();
                    this.player.setTexture("playerLeft");
                    break;
                case "right":
                    this.player.setTexture("playerRight");
                    break;
            }
        }

        if (this.currentDirection === "right" && isMoving) {
            this.player.anims.play("walkRight", true);
        } else if (this.currentDirection === "right" && !isMoving) {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
        if (this.currentDirection === "up" && isMoving) {
            this.player.anims.play("walkUp", true);
        } else if (this.currentDirection === "up" && !isMoving) {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
        if (this.currentDirection === "down" && isMoving) {
            this.player.anims.play("walkDown", true);
        } else if (this.currentDirection === "down" && !isMoving) {
            this.player.anims.stop();
            this.player.setFrame(0);
        }
        if (this.currentDirection === "left" && isMoving) {
            this.player.anims.play("walkLeft", true);
        } else if (this.currentDirection === "left" && !isMoving) {
            this.player.anims.stop();
            this.player.setFrame(0);
        }

        this.coordText.setText(
            `X: ${Math.floor(this.player.x)}\nY: ${Math.floor(this.player.y)}`
        );
    }
}
