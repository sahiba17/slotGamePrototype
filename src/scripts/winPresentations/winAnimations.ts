import { GameResult, GameConstants } from "../constants/gameConstants";
import BaseGameScene from "../scenes/basegameScene";

export class WinAnimation {
    private _winIdx: number;
    private _gameScene: BaseGameScene;
    private _winText: Phaser.GameObjects.Text;
    private _winSymImage: Phaser.GameObjects.Image;
    private _timer: Phaser.Time.TimerEvent;
    private _view: Phaser.GameObjects.Container;

    // represnting one single phase of evaluating the line wins;
    constructor(scene: BaseGameScene) {
        this._gameScene = scene;
        this._view = scene.add.container();
        this._winText = this.createTextFeild();
    }
    private createTextFeild(): Phaser.GameObjects.Text {
        var style = { font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        return this._gameScene.add.text(800, 950, '', style);
    }
    public start(): void {
        this._winIdx = 0;
        this.animateLine();

    }
    private animateLine(): void {
        if (this._winIdx < GameResult.WINS.length) {
            this.setSymAnim();
            this.updateWinText(true);
            this._timer = this._gameScene.time.addEvent({
                delay: 1000,
                callback: this.onLineAnimationFinished,
                callbackScope: this,
                loop: false
            });
        } else {
            this.updateWinText(false);
            this._gameScene.mainEvents.emit(GameConstants.EVT_WIN_PRES_FINISH);
        }
    }
    private updateWinText(isWin: boolean): void {
        if (isWin) {
            if (this._winSymImage) { this._winSymImage.destroy(); }
            this._winSymImage = this._gameScene.reelContainer.getReel(0).availableSymbols[GameResult.WINS[this._winIdx].winSym].createReelAnim(750, 980);
            this._winSymImage.setScale(0.3);
            this._view.add(this._winSymImage);
            this._winText.text = ' x  ' + GameResult.WINS[this._winIdx].winSymCount + '  =  ' + GameResult.PAYOUT['x' + GameResult.WINS[this._winIdx].winSymCount][GameResult.WINS[this._winIdx].winSym];
        } else {
            this._winText.text = '';
            if (this._winSymImage) { this._winSymImage.destroy(); }
        }
    }
    private onLineAnimationFinished(): void {
        this._timer.remove(false);
        this.stopAnim();
        this._winIdx++;
        this.animateLine();
    }
    private setSymAnim(): void {
        // flashing win frame of symbol to represent it's win
        let win = GameResult.WINS[this._winIdx];
        for (let pos of GameResult.WINS[this._winIdx].pos) {
            let sym = this._gameScene.reelContainer.getReel(pos.x).availableSymbols[win.winSym].createWinAnim(GameConstants.REEL_X + ((GameConstants.SYM_WIDTH + GameConstants.REEL_GAP) * pos.x), GameConstants.REEL_Y + (GameConstants.SYM_HEIGHT * (pos.y + 1)));
            this._view.add(sym);
        }
    }
    private stopAnim(): void {

        // removed this code since in current situation the animation is being removed after the tween completes
    }
}