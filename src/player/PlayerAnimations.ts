import Phaser from "phaser";

export function createPlayerAnimations(scene: Phaser.Scene) {
    scene.anims.create({
        key: "walkRight",
        frames: scene.anims.generateFrameNumbers("playerRight", {
            start: 0,
            end: 1,
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "walkUp",
        frames: scene.anims.generateFrameNumbers("playerUp", {
            start: 0,
            end: 1,
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "walkDown",
        frames: scene.anims.generateFrameNumbers("playerDown", {
            start: 0,
            end: 1,
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "walkLeft",
        frames: scene.anims.generateFrameNumbers("playerLeft", {
            start: 0,
            end: 1,
        }),
        frameRate: 6,
        repeat: -1,
    });
}
