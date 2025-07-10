import Phaser from "phaser";

export function createPlayer(scene: Phaser.Scene) {
    return scene.physics.add.sprite(32 * 10, 32 * 10, "playerDown");
}

export function updatePlayerMovement(
    player: Phaser.Physics.Arcade.Sprite,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    scene: any
) {
    const speed = 120;
    player.setVelocity(0);

    let newDirection = scene.currentDirection;
    let isMoving = false;

    const W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    const left = cursors.left.isDown || A.isDown;
    const right = cursors.right.isDown || D.isDown;
    const up = cursors.up.isDown || W.isDown;
    const down = cursors.down.isDown || S.isDown;

    if (left) {
        player.setVelocityX(-speed);
        newDirection = "left";
        isMoving = true;
    } else if (right) {
        player.setVelocityX(speed);
        newDirection = "right";
        isMoving = true;
    }

    if (up) {
        player.setVelocityY(-speed);
        newDirection = "up";
        isMoving = true;
    } else if (down) {
        player.setVelocityY(speed);
        newDirection = "down";
        isMoving = true;
    }

    if (newDirection !== scene.currentDirection) {
        scene.currentDirection = newDirection;
        switch (newDirection) {
            case "up":
                player.anims.stop();
                player.setTexture("playerUp");
                break;
            case "down":
                player.anims.stop();
                player.setTexture("playerDown");
                break;
            case "left":
                player.anims.stop();
                player.setTexture("playerLeft");
                break;
            case "right":
                player.setTexture("playerRight");
                break;
        }
    }

    if (scene.currentDirection === "right" && isMoving) {
        player.anims.play("walkRight", true);
    } else if (scene.currentDirection === "right" && !isMoving) {
        player.anims.stop();
        player.setFrame(0);
    }
    if (scene.currentDirection === "up" && isMoving) {
        player.anims.play("walkUp", true);
    } else if (scene.currentDirection === "up" && !isMoving) {
        player.anims.stop();
        player.setFrame(0);
    }
    if (scene.currentDirection === "down" && isMoving) {
        player.anims.play("walkDown", true);
    } else if (scene.currentDirection === "down" && !isMoving) {
        player.anims.stop();
        player.setFrame(0);
    }
    if (scene.currentDirection === "left" && isMoving) {
        player.anims.play("walkLeft", true);
    } else if (scene.currentDirection === "left" && !isMoving) {
        player.anims.stop();
        player.setFrame(0);
    }
}
