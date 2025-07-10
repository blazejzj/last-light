import Phaser from "phaser";

export class PauseMenu {
    container: Phaser.GameObjects.Container;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const width = scene.sys.game.canvas.width;
        const height = scene.sys.game.canvas.height;

        const overlay = scene.add
            .rectangle(0, 0, width, height, 0x000000, 0.6)
            .setOrigin(0)
            .setScrollFactor(0)
            .setInteractive();

        const pausedText = scene.add
            .text(width / 2, height / 2 - 60, "Paused", {
                font: "32px Arial",
                color: "#fff",
            })
            .setOrigin(0.5)
            .setScrollFactor(0);

        const resumeBtn = scene.add
            .text(width / 2, height / 2 + 10, "Back to Game", {
                font: "24px Arial",
                backgroundColor: "#444",
                color: "#fff",
                padding: { left: 20, right: 20, top: 10, bottom: 10 },
            })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setInteractive({ useHandCursor: true });

        overlay.setDepth(9999);
        pausedText.setDepth(10000);
        resumeBtn.setDepth(10001);

        resumeBtn.on("pointerdown", () => {
            this.hide();
            this.scene.physics.resume();
            this.scene.scene.resume();
        });

        this.container = scene.add.container(0, 0, [
            overlay,
            pausedText,
            resumeBtn,
        ]);
        this.container.setDepth(9999);
        this.container.setVisible(false);
    }

    show() {
        this.container.setVisible(true);
    }
    hide() {
        this.container.setVisible(false);
    }
}
