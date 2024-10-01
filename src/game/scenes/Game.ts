import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { RESULT, SEAT, STATUS } from "../types";
import { INFO } from "../types/sence";
import { BidPopup } from "./Popups/BidPopup";
import { ResultPopup } from "./Popups/ResultPopup";
// import { SEAT, STATUS } from "../types/status";

export class Game extends Scene {
    private seatContainer: Phaser.GameObjects.Container;
    private availSeat: Phaser.GameObjects.Image;
    private price: Phaser.GameObjects.Text;
    private infoUser: Phaser.GameObjects.Container;
    private clockContainer: Phaser.GameObjects.Container;
    private bidPopup: BidPopup;
    private resultPopup: ResultPopup;
    private result: RESULT | RESULT.LOSE;

    constructor() {
        super("Game");
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("star", "star.png");
        this.load.image("background", "background.png");
        this.load.image("logo", "logo.png");
        this.load.image("empty", "empty-seat.png");
        this.load.image("my_seat", "my-seat.png");
        this.load.image("occupied", "occupied-seat.png");
        this.load.image("clock", "clock.png");
        this.load.image("demo", "demo-button.png");
        this.load.image("play", "play-button.png");
        this.load.image("docs", "docs-button.png");

        this.load.image("balance", "balance.png");

        //Popup bid
        this.load.image("bgPopupBid", "bg-popup-bid.png");
        this.load.image("btnClose", "btn-close.png");
        this.load.image("btnBid", "btn-bid.png");

        //Popup Result
        this.load.image("bgResult", "bg-result.png");
        this.load.image("btnOk", "btn-ok.png");
        this.load.image("textWin", "text-win.png");
        this.load.image("textLose", "text-lose.png");
    }

    create() {
        this.bidPopup = new BidPopup(this);
        this.bidPopup.createBidPopup();

        this.resultPopup = new ResultPopup(this);
        const seat: SEAT[] = [
            {
                id: 1,
                amount: 110,
                status: STATUS.EMPTY,
            },
            {
                id: 2,
                amount: 111,
                status: STATUS.OCCUPIED,
            },
            {
                id: 3,
                amount: 112,
                status: STATUS.MY_SEAT,
            },
            {
                id: 4,
                amount: 113,
                status: STATUS.EMPTY,
            },
            {
                id: 5,
                amount: 114,
                status: STATUS.OCCUPIED,
            },
            {
                id: 6,
                amount: 115,
                status: STATUS.EMPTY,
            },
            {
                id: 7,
                amount: 116,
                status: STATUS.OCCUPIED,
            },
            {
                id: 8,
                amount: 117,
                status: STATUS.EMPTY,
            },
            {
                id: 9,
                amount: 118,
                status: STATUS.MY_SEAT,
            },
        ];

        const gridSize = 3;
        const iconSpacing = 300;
        const startX = 60;
        const startY = 220;

        // Add background
        this.add.image(0, 0, "background").setOrigin(0);

        //Add header
        this.add.image(87, 15, "logo").setOrigin(0);
        this.add
            .image(1060, 15, "play")
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });

        this.add
            .image(1180, 15, "demo")
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });
        this.add
            .image(1300, 15, "docs")
            .setOrigin(0)
            .setInteractive({ useHandCursor: true });

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const index = row * gridSize + col;

                const deltaY =
                    seat[index].status === STATUS.MY_SEAT
                        ? 34
                        : seat[index].status === STATUS.OCCUPIED
                        ? 10
                        : 0;

                this.seatContainer = this.add.container(
                    startX + col * iconSpacing,
                    startY + row * (iconSpacing - 100) - deltaY
                );
                this.availSeat = this.add
                    .image(0, 0, seat[index].status)
                    .setOrigin(0)
                    .setInteractive({ useHandCursor: true })
                    .on("pointerdown", () => {
                        if (seat[index].status === STATUS.EMPTY) {
                            this.bidPopup.show();
                        } else if (seat[index].status === STATUS.MY_SEAT) {
                            //handle popup win
                            this.resultPopup.createResultPopup(RESULT.WIN);
                            this.resultPopup.show();
                        } else {
                            //handle popup lose
                            this.resultPopup.createResultPopup(RESULT.LOSE);
                            this.resultPopup.show();
                        }
                    });
                this.price = this.add.text(
                    this.availSeat.x + 130,
                    this.availSeat.y + 60 + deltaY,
                    seat[index].amount.toString(),
                    {
                        fontSize: "40px",
                        fontStyle: "600",
                        color: "#000",
                        align: "center",
                    }
                );

                this.seatContainer.add(this.availSeat);
                this.seatContainer.add(this.price);
            }
        }

        this.infoUser = this.add.container(
            this.renderer.width - 300,
            this.renderer.height - 165
        );

        const backgroundBalance = this.add.image(0, 0, "balance");

        // Use Yokelvision font for this text
        const totalPNL = this.add.text(45, -95, "Total PNL: 4776.0318", {
            fontFamily: "Yokelvision",
            fontSize: "21px",
            color: "#FFFFFF",
        });

        const address = this.add.text(-30, -40, "0x32..dada77".toUpperCase(), {
            fontFamily: "Yokelvision",
            fontSize: "35px",
            color: "#FFA826",
        });

        const balance = this.add.text(-30, 0, "Balance: 876.46k", {
            fontFamily: "Yokelvision",
            fontSize: "20px",
            color: "#EEEEEE",
        });

        const thisRoundPNL = this.add.text(-30, 28, "Est this round PnL:", {
            fontFamily: "Yokelvision",
            fontSize: "20px",
            color: "#EEEEEE",
        });

        const thisRoundChair = this.add.text(
            -30,
            56,
            "invested chair(s) this round:",
            {
                fontFamily: "Yokelvision",
                fontSize: "20px",
                color: "#EEEEEE",
            }
        );

        this.infoUser.add(backgroundBalance);
        this.infoUser.add(address);
        this.infoUser.add(totalPNL);
        this.infoUser.add(balance);
        this.infoUser.add(thisRoundPNL);
        this.infoUser.add(thisRoundChair);

        this.clockContainer = this.add.container(970, 140);
        const clockBg = this.add.image(0, 0, "clock").setOrigin(0);
        const totalBid = this.add.text(230, 170, "999999.99", {
            fontFamily: "Yokelvision",
            fontSize: "30px",
            color: "#FFFFFF",
        });

        this.clockContainer.add(clockBg);
        this.clockContainer.add(totalBid);
        this.renderClock(20);
        EventBus.emit("current-scene-ready", this);
    }

    renderInfo(info: INFO) {
        console.log("123213");
    }

    renderClock(time: number) {
        // Convert time from seconds to MM:SS format
        const min = Math.floor(time / 60);
        const sec = time % 60;
        const formattedTime = `${min.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`;
        const [minutes, seconds] = formattedTime.split(":");
        const [m, m1] = minutes.split("");
        const [s, s1] = seconds.split("");
        const minute = this.add.text(113, 315, m, {
            fontFamily: "Yokelvision",
            fontSize: "70px",
            color: "#000000",
        });
        const minute1 = this.add.text(184, 315, m1, {
            fontFamily: "Yokelvision",
            fontSize: "70px",
            color: "#000000",
        });
        const second = this.add.text(283, 315, s, {
            fontFamily: "Yokelvision",
            fontSize: "70px",
            color: "#000000",
        });
        const second1 = this.add.text(357, 315, s1, {
            fontFamily: "Yokelvision",
            fontSize: "70px",
            color: "#000000",
        });
        this.clockContainer.add(minute);
        this.clockContainer.add(minute1);
        this.clockContainer.add(second);
        this.clockContainer.add(second1);
    }
}
