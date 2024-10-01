import { RESULT } from "@/game/types";
import { GameObjects, Scene } from "phaser";
export class ResultPopup {
    private popup: Phaser.GameObjects.Container | null = null;
    private scene: Phaser.Scene;
    private errorBackground: GameObjects.Rectangle;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public createResultPopup(result: RESULT): void {
        this.errorBackground = this.scene.add
            .rectangle(
                0,
                0,
                this.scene.scale.width,
                this.scene.scale.height,
                0xcaea89,
                0.9
            )
            .setInteractive()
            .setVisible(false)
            .setOrigin(0, 0)
            .setDepth(2);

        this.popup = this.scene.add
            .container(
                this.scene.scale.width / 2 - 400,
                this.scene.scale.height / 2 - 300
            )
            .setDepth(3)
            .setAlpha(0);
        const bgPopup = this.scene.add.image(0, 0, "bgResult").setOrigin(0, 0);
        const btnOk = this.scene.add
            .image(this.popup.x - 110, this.popup.y + 410, "btnOk")
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.hide();
            });
        const textWin = this.scene.add
            .image(this.popup.x - 85, this.popup.y - 130, "textWin")
            .setInteractive({ useHandCursor: true })
            .setOrigin(0, 0);
        const textLose = this.scene.add
            .image(this.popup.x - 120, this.popup.y - 130, "textLose")
            .setInteractive({ useHandCursor: true })
            .setOrigin(0, 0);
        this.popup.add(bgPopup);
        this.popup.add(btnOk);
        this.popup.add(result === RESULT.WIN ? textWin : textLose);
    }

    public show(scene?: Scene): void {
        if (this.popup) {
            this.errorBackground.setVisible(true);
            this.popup.setAlpha(1);
        }
    }

    public hide(): void {
        if (this.popup) {
            this.errorBackground.setVisible(false);
            this.popup.setAlpha(0);
        }
    }
}
