export class GameConstants {
    // symbol mapping
    public static readonly NINE: number = 0;
    public static readonly TEN: number = 1;
    public static readonly J: number = 2;
    public static readonly Q: number = 3;
    public static readonly K: number = 4;
    public static readonly A: number = 5;
    public static readonly M6: number = 6;
    public static readonly M5: number = 7;
    public static readonly M4: number = 8;
    public static readonly M3: number = 9;
    public static readonly M2: number = 10;
    public static readonly M1: number = 11;
    public static readonly H6: number = 12;
    public static readonly H5: number = 13;
    public static readonly H4: number = 14;
    public static readonly H3: number = 15;
    public static readonly H2: number = 16;
    public static readonly H1: number = 17;

    // length of symbols in each reel strip
    public static readonly REEL_SYM_LENGTH = [20, 22, 24, 26, 28];

    public static readonly REEL_GAP = 5;
    public static readonly SYM_WIDTH = 200;
    public static readonly SYM_HEIGHT = 200;
    public static readonly REEL_X = 450;
    public static readonly REEL_Y = 200;
    public static readonly VISIBLE_SYMBOL_COUNT = 3;
    public static readonly SWING_OFF_COUNT = 1;
    public static readonly NO_OF_REELS = 5;

    public static readonly SPIN_BTN_X = 1600;
    public static readonly SPIN_BTN_Y = 600;



    public static readonly PRELOAD_SCENE: string = "PreloadScene";
    public static readonly BASEGAME_SCENE: string = "BaseGameScene";


    public static readonly EVT_REEL_SPIN_COMPLETE: string = "reelSpinFinished";
    public static readonly EVT_SINGLE_REEL_STOP: string = "reelStop";
    public static readonly EVT_WIN_PRES_FINISH: string = "winAnimFinish";

    



}
export class GameResult {
    // calculating wins of random symbols and storing the data here
    public static WINS: { winSym: number, winSymCount: number, pos: { x: number, y: number }[] }[] = [];
    public static readonly PAYOUT = { x2: [10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30], x3: [20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30, 30, 40, 40, 40, 40, 40, 40], x4: [30, 30, 30, 30, 30, 30, 40, 40, 40, 40, 40, 40, 50, 50, 50, 50, 50, 50], x5: [40, 40, 40, 40, 40, 40, 50, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 60] };

    public static readonly CHEAT_ON: boolean = false;
    public static readonly CHEAT_REEL_SET = [[15, 10, 5, 3, 12, 17, 7, 1, 10, 10, 16, 0, 4, 11, 9, 2, 8, 3, 6, 8], [10, 9, 17, 10, 1, 16, 0, 0, 8, 3, 6, 5, 0, 11, 0, 1, 14, 8, 14, 5, 0, 7], [1, 7, 14, 4, 14, 7, 13, 11, 15, 4, 10, 17, 13, 4, 17, 12, 0, 12, 2, 15, 10, 17, 8, 0], [13, 17, 15, 12, 5, 3, 7, 6, 14, 11, 0, 9, 15, 9, 17, 1, 4, 4, 4, 11, 11, 7, 7, 5, 8, 3], [0, 17, 14, 16, 5, 10, 0, 8, 3, 5, 10, 6, 2, 5, 6, 6, 17, 2, 3, 2, 3, 15, 17, 4, 15, 11, 4, 6]]
    public static readonly CHEAT_STOP_IDX = [9, 5, 10, 13, 3];



}