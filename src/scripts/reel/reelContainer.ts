import { GameConstants } from '../constants/gameConstants';
import { Reel } from '../reel/reel'
import BaseGameScene from '../scenes/basegameScene';
import { GameSymbol } from '../symbols/gameSymbol';
export class ReelContainer {
    private _reels: Reel[] = [];
    private _view: Phaser.GameObjects.Container;
    private _scene : BaseGameScene;
    constructor(scene: BaseGameScene, x: number, y: number, width: number, height: number) {
        this._scene = scene;
        let rect = scene.add.graphics();
        rect.fillRect(x - (GameConstants.SYM_WIDTH / 2), y + (GameConstants.SYM_HEIGHT / 2), width, height);
        let mask = rect.createGeometryMask();
        this._view = scene.add.container(x, y);
        this._view.setMask(mask);
    }
    public addReels(reel: Reel): void {
        this._view.add(reel.view);
        this._reels.push(reel);
    }
    public setSymbols(symbols: GameSymbol[]): void {
        for (let reel in this._reels) {
            this._reels[reel].availableSymbols = symbols;
        }
    }
    public setInitReels(data: number[][]) {
        for (let reel in this._reels) {
            this._reels[reel].reelStrip = data[reel];
            this._reels[reel].setInitResult();
        }
    }
    public setStopIdx(posIdxs: number[]) {
        for (let reel in this._reels) {
            this._reels[reel].stopPosition = posIdxs[reel];
        }
    }
    public startReels() {
        for (let reel in this._reels) {
            this._reels[reel].currentState = this._reels[0].SPIN_STATE;
            this._reels[reel].startReel();
            this._reels[reel].reelStopEvent.once(GameConstants.EVT_SINGLE_REEL_STOP, this.onReelStop, this);
        }
        this._reels[0].currentState = this._reels[0].STOPPING_STATE;
    }
    private onReelStop(id: number): void {
        this._reels[id].currentState = this._reels[id].IDLE_STATE;
        if (id === this._reels.length - 1) {
            this.onAllReelsStop();
        } else {
            this._reels[id + 1].currentState = this._reels[id + 1].STOPPING_STATE;
        }
    }
    private onAllReelsStop(): void {
        this._scene.mainEvents.emit(GameConstants.EVT_REEL_SPIN_COMPLETE);
    }
    getReel(idx: number) {
        return this._reels[idx];
    }
    get view() {
        return this._view;
    }
}
