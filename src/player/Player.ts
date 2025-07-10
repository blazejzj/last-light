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

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        newDirection = "left";
        isMoving = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        newDirection = "right";
        isMoving = true;
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        newDirection = "up";
        isMoving = true;
    } else if (cursors.down.isDown) {
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
