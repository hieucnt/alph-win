import { GameObjects, Scene } from "phaser";
export class BidPopup {
    private popup: Phaser.GameObjects.Container | null = null;
    private scene: Phaser.Scene;

    private errorBackground: GameObjects.Rectangle;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public createBidPopup(): void {
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

        this.popup = this.scene.add.container(0, 0).setDepth(3).setAlpha(0);
        const bgPopup = this.scene.add
            .image(500, 170, "bgPopupBid")
            .setOrigin(0, 0);
        const btnBid = this.scene.add
            .image(bgPopup.x + 25, bgPopup.y + 340, "btnBid")
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true });
        const btnClose = this.scene.add
            .image(bgPopup.x + 370, bgPopup.y + 30, "btnClose")
            .setInteractive({ useHandCursor: true })
            .setOrigin(0, 0)
            .on("pointerdown", () => {
                this.hide();
            });
        this.popup.add(bgPopup);
        this.popup.add(btnBid);
        this.popup.add(btnClose);
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
