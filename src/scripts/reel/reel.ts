import { GameConstants } from "../constants/gameConstants";
import { GameSymbol } from "../symbols/gameSymbol";

export class Reel {
    public scene: Phaser.Scene;
    private _view: Phaser.GameObjects.Container;
    private _id: number;
    private _visibleCount: number;
    private _symHeight: number;
    private _availableSymbols: GameSymbol[] = [];
    private _stopPosition: number = -1;
    private _currIdx = 0;
    private _reelStrip: number[] = [];
    private _currentState: string = 'idle';
    public readonly SPIN_STATE: string = 'spin';
    public readonly STOPPING_STATE: string = 'stopping';
    public readonly IDLE_STATE: string = 'idle';
    public reelStopEvent: Phaser.Events.EventEmitter;

    private _speed = 2.5; //in pixels per miliseconds


    constructor(scene: Phaser.Scene, id: number, x: number, y: number, visibleCount: number, symWidth: number, symHeight: number) {
        this.scene = scene;
        this._id = id;
        this._view = scene.add.container();
        this._visibleCount = visibleCount;
        this._symHeight = symHeight;
        this.createReel(x, y, symWidth, symHeight);
        this.reelStopEvent = new Phaser.Events.EventEmitter();
    }
    private createReel(x: number, y: number, symWidth: number, symHeight: number): void {
        this._view.x = x;
        this._view.y = y;
    }
    public setInitResult() {
        this.clearReels();
        let symCount = this._visibleCount + GameConstants.SWING_OFF_COUNT;
        for (let i = 0; i < symCount; i++) {
            this._view.add(this._availableSymbols[this._reelStrip[i]].createReelAnim(0, ((symCount - i)) * this._symHeight));
        }
        this._view.y = -((symCount - this._visibleCount) * this._symHeight);
    }
    public set stopPosition(posIdx: number) {
        this._stopPosition = posIdx;
    }
    private clearReels(): void {
        this._view.removeAll(true);
    }
    public startReel(): void {
        let duration = Math.abs(this._view.y * (1 / this._speed));
        let tween = this.scene.tweens.add({
            targets: this._view,
            y: 0,
            duration: duration,
            repeat: Number.POSITIVE_INFINITY,
            onRepeat: () => {
                if (this._currentState === this.STOPPING_STATE && this._stopPosition === this._currIdx) {
                    tween.complete();
                    return;
                }
                this.updateReelView();
            },
            onComplete: () => {
                this.updateReelView();
                this.reelStopEvent.emit(GameConstants.EVT_SINGLE_REEL_STOP, this._id);
            }
        });
    }
    private updateReelView(): void {
        this.view.list.shift()?.destroy();
        this.view.y = -this._symHeight;

        this._view.add(this._availableSymbols[this._reelStrip[this._currIdx]].createReelAnim(0, 0));
        this._currIdx = this._currIdx >= this._reelStrip.length - 1 ? 0 : this._currIdx + 1;

        for (let child of this._view.list) {
            (child as Phaser.GameObjects.Image).y += this._symHeight;
        }
    }
    public getSymbolAtRow(idx: number): Phaser.GameObjects.Image {
        return this.view.list[(GameConstants.VISIBLE_SYMBOL_COUNT - GameConstants.SWING_OFF_COUNT) - idx] as Phaser.GameObjects.Image;
    }
    set reelStrip(data: number[]) {
        this._reelStrip = data;
    }
    set availableSymbols(data: GameSymbol[]) {
        this._availableSymbols = data;
    }
    get availableSymbols(): GameSymbol[] {
        return this._availableSymbols;
    }
    get view(): Phaser.GameObjects.Container {
        return this._view;
    }
    set currentState(state: string) {
        this._currentState = state;
    }
    get currentState(): string {
        return this._currentState;
    }
}