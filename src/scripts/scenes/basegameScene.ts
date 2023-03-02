import { ReelContainer } from '../reel/reelContainer'
import { Reel } from '../reel/reel'
import { GameConstants, GameResult } from '../constants/gameConstants'
import { ReelData } from '../data/reelData'
import { WinAnimation } from '../winPresentations/winAnimations'
import { GameSymbol } from '../symbols/gameSymbol'
export default class BaseGameScene extends Phaser.Scene {
  public startBtn: Phaser.GameObjects.Image;
  public reelContainer: ReelContainer;
  public winAnimation: WinAnimation;
  public background: Phaser.GameObjects.Image;
  private _mainEvents: Phaser.Events.EventEmitter;
  private _reelData: number[][] = [];
  private
  constructor() {
    super({ key: GameConstants.BASEGAME_SCENE });
  }

  create() {
    this.reelContainer = this.createReelContainer();
    this.winAnimation = new WinAnimation(this);
    let GameSymbol = this.createGameSymbol();
    this.reelContainer.setSymbols(GameSymbol);
    this.reelContainer.setInitReels(this._reelData = ReelData.generateReelData(GameResult.CHEAT_ON));//ReelData.generateReelData() gives us dummy reel stripes that are set at the init for server response usually
    this.startBtn = this.createBtn();
    this._mainEvents = new Phaser.Events.EventEmitter();
    this.enableStartBtn();

  }

  private startReels() {
    this.disableStartBtn();
    let stopPos = ReelData.generateStopPositions(GameResult.CHEAT_ON)
    this.reelContainer.setStopIdx(stopPos);
    ReelData.searchWinSequence(this._reelData, stopPos);
    this.reelContainer.startReels();
    this._mainEvents.once(GameConstants.EVT_REEL_SPIN_COMPLETE, this.onReelSpinFinish, this);
  }
  createBtn(): Phaser.GameObjects.Image {
    let btn = this.add.image(GameConstants.SPIN_BTN_X, GameConstants.SPIN_BTN_Y, 'btn').setInteractive();
    btn.scale = 2;
    return btn;
  }

  createGameSymbol(): GameSymbol[] {
    // not much use right now, but we can set all the types of animations for a symbol on symbol class and manage them at different phases
    let _GameSymbol: GameSymbol[] = [];
    _GameSymbol.push(new GameSymbol(this, GameConstants.NINE, "sym9", 'sym9_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.TEN, "sym10", 'sym10_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.J, "symJ", 'symJ_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.Q, "symQ", 'symQ_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.K, "symK", 'symK_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.A, "symA", 'symA_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M6, "symM6", 'symM6_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M5, "symM5", 'symM5_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M4, "symM4", 'symM4_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M3, "symM3", 'symM3_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M2, "symM2", 'symM2_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.M1, "symM1", 'symM1_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H6, "symH6", 'symH6_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H5, "symH5", 'symH5_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H4, "symH4", 'symH4_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H3, "symH3", 'symH3_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H2, "symH2", 'symH2_connect'));
    _GameSymbol.push(new GameSymbol(this, GameConstants.H1, "symH1", 'symH1_connect'));
    return _GameSymbol;

  }
  createReelContainer(): ReelContainer {
    let rc = new ReelContainer(this, GameConstants.REEL_X, GameConstants.REEL_Y, GameConstants.NO_OF_REELS * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 3 * GameConstants.SYM_HEIGHT);
    for (let i = 0; i < GameConstants.NO_OF_REELS; i++) {
      rc.addReels(new Reel(this, i, i * (GameConstants.SYM_WIDTH + GameConstants.REEL_GAP), 0, GameConstants.VISIBLE_SYMBOL_COUNT, GameConstants.SYM_WIDTH, GameConstants.SYM_HEIGHT));
    }
    return rc;
  }
  private onReelSpinFinish(): void {
    this.startWinPresentation();
  }
  private startWinPresentation(): void {
    this._mainEvents.once(GameConstants.EVT_WIN_PRES_FINISH, this.enableStartBtn, this);
    this.winAnimation.start();
  }
  private enableStartBtn(): void {
    this.startBtn.alpha = 1;
    this.startBtn.once('pointerup', this.startReels, this);
  }
  private disableStartBtn(): void {
    // this.startBtn.removeAllListeners('pointerup');
    this.startBtn.alpha = 0.3;
    //didn't removed event because it was added for once
  }
  get mainEvents(): Phaser.Events.EventEmitter {
    return this._mainEvents;
  }
}
