import Phaser from "phaser";

export function createCoordText(scene: Phaser.Scene): Phaser.GameObjects.Text {
    const coordText = scene.add.text(16, 16, "", {
        font: "12px helvetica",
        color: "#fff",
        padding: { x: 6, y: 4 },
    });
    coordText.setScrollFactor(0);
    coordText.setDepth(1000);
    return coordText;
}

export function updateCoordText(
    coordText: Phaser.GameObjects.Text,
    player: Phaser.Physics.Arcade.Sprite
) {
    coordText.setText(`X: ${Math.floor(player.x)}\nY: ${Math.floor(player.y)}`);
}
