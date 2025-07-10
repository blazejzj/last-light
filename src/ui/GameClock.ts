import Phaser from "phaser";

export class GameClock {
    clockText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.clockText = scene.add.text(16, 50, "", {
            font: "12px helvetica",
            fill: "#fff",
        });
        this.clockText.setScrollFactor(0);
        this.clockText.setDepth(1000);
    }

    setPosition(x: number, y: number) {
        this.clockText.setPosition(x, y);
    }

    update(hours: number, mins: number) {
        this.clockText.setText(
            `Time: ${hours.toString().padStart(2, "0")}:${mins
                .toString()
                .padStart(2, "0")}`
        );
    }
}
