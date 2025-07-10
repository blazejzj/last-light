import Phaser from "phaser";

export function createToolbar(scene: Phaser.Scene) {
    const slots = [];

    for (let i = 0; i < 5; i++) {
        const slot = scene.add.image(0, 0, "toolbar", 0);
        slot.setDisplaySize(24, 24);
        slots.push(slot);
    }

    const x = scene.cameras.main.centerX;
    const y = 518;
    const toolbar = scene.rexUI.add
        .buttons({
            x,
            y,
            orientation: 0,
            buttons: slots,
            space: { item: 2 },
            align: "center",
        })
        .layout();

    toolbar.setScrollFactor(0);
    let selectedSlot = -1;
    scene.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
        const keyNum = parseInt(event.key);
        if (keyNum >= 1 && keyNum <= 5) {
            if (selectedSlot + 1 === keyNum) {
                slots.forEach((slot) => slot.setFrame(0));
                selectedSlot = -1;
            } else {
                slots.forEach((slot, i) => {
                    slot.setFrame(i === keyNum - 1 ? 1 : 0);
                    1234;
                });
                selectedSlot = keyNum - 1;
            }
        }
    });

    return toolbar;
}
