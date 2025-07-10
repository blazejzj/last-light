import Phaser from "phaser";

export class InventoryUI {
    scene: Phaser.Scene;
    container: Phaser.GameObjects.Container;
    overlay: Phaser.GameObjects.Rectangle;
    isOpen = false;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        const width = scene.sys.game.canvas.width;
        const height = scene.sys.game.canvas.height;

        this.overlay = scene.add
            .rectangle(0, 0, width, height, 0x000000, 0.4)
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(9999)
            .setVisible(false);

        const cols = 3,
            rows = 3;
        const slotSize = 32;
        const padding = 8;

        const gridW = cols * slotSize + (cols - 1) * padding;
        const gridH = rows * slotSize + (rows - 1) * padding;

        const slots: Phaser.GameObjects.Image[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const slot = scene.add.image(
                    -gridW / 2 + x * (slotSize + padding) + slotSize / 2,
                    -gridH / 2 + y * (slotSize + padding) + slotSize / 2,
                    "toolbar",
                    0
                );
                slot.setDisplaySize(slotSize, slotSize);
                slots.push(slot);
            }
        }

        this.container = scene.add.container(width / 2, height / 2, slots);
        this.container.setDepth(10000);
        this.container.setVisible(false);
    }

    show() {
        this.isOpen = true;
        this.overlay.setVisible(true);
        this.container.setVisible(true);
    }

    hide() {
        this.isOpen = false;
        this.overlay.setVisible(false);
        this.container.setVisible(false);
    }

    toggle() {
        this.isOpen ? this.hide() : this.show();
    }
}
