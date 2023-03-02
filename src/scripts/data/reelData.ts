import { GameConstants, GameResult } from "../constants/gameConstants";
// used to create and calculate reels and wins data at front end for represntation purpose
// in real game we can use this to parse the backend response into the data structure of our liking
export class ReelData {

    // used to create reelstripe data
    public static generateReelData(isWin = false): number[][] {
        if (isWin) {
            return GameResult.CHEAT_REEL_SET;
        }
        let arr: number[][] = []; GameResult.WINS = [];
        for (let i = 0; i < GameConstants.REEL_SYM_LENGTH.length; i++) {
            let reelData: number[] = [];
            for (let j = 0; j < GameConstants.REEL_SYM_LENGTH[i]; j++) {
                reelData.push(this.getRandomInt(GameConstants.H1)); // H1 being the largest symbol
            } arr.push(reelData);
        }
        return arr;
    }
    public static generateStopPositions(isWin = false): number[] {
        if (isWin) {
            return GameResult.CHEAT_STOP_IDX;
        }
        let arr: number[] = []; GameResult.WINS = [];
        for (let i = 0; i < GameConstants.REEL_SYM_LENGTH.length; i++) {
            arr.push(this.getRandomInt(GameConstants.REEL_SYM_LENGTH[i] - 1));
        }
        return arr;
    }
    public static getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }
    public static searchWinSequence(reels: number[][], stopIdx: number[]): void {
        let matrix: number[][] = []; GameResult.WINS = [];
        for (let r = 0; r < reels.length; r++) {
            let reel: number[] = [];
            let s = stopIdx[r];
            if (!isNaN(reels[r][s - 1])) {
                reel.push(reels[r][s - 1]);
            } else {
                reel.push(reels[r][reels[r].length - 1]);
                reel.push(reels[r][reels[r].length - 2]);
                reel.push(reels[r][reels[r].length - 3]);
                matrix.push(reel);
                continue;
            }
            if (!isNaN(reels[r][s - 2])) {
                reel.push(reels[r][s - 2]);

            } else {
                reel.push(reels[r][reels[r].length - 1]);
                reel.push(reels[r][reels[r].length - 2]);
                matrix.push(reel);
                continue;
            }
            if (!isNaN(reels[r][s - 3])) {
                reel.push(reels[r][s - 3]);

            } else {
                reel.push(reels[r][reels[r].length - 1]);
            }
            matrix.push(reel);
        }

        for (let i = 0; i < matrix[0].length; i++) {
            let winSym = matrix[0][i];
            let win = { winSym: winSym, winSymCount: 1, pos: [{ x: 0, y: i }] }
            for (let row = 1; row < matrix.length; row++) {
                let occurance = 1;
                for (let sym = 0; sym < matrix[row].length; sym++) {
                    if (winSym === matrix[row][sym]) {
                        occurance++;
                        win.pos.push({ x: row, y: sym });
                        if (occurance >= GameConstants.NO_OF_REELS) {
                            win.winSymCount = occurance;
                            break;
                        }
                    }
                }
                if (occurance > win.winSymCount) {
                    win.winSymCount = occurance;
                } else {
                    break;
                }
            }
            if (win.winSymCount > 1) {
                GameResult.WINS.push(win);
            }
        }
    }
}