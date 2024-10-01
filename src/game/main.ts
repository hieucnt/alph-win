import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1512,
    height: 982,
    parent: "game-container",
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    scene: [MainGame],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
