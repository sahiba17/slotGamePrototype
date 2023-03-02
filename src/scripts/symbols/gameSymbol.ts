    // purpose of this class is to provide different types of animations related to one symbol.
    // currently we only have 2 types of animations
    export class GameSymbol {
        public id: number;
        public reelAnim: string;
        public winAnim: string;
        public scene: Phaser.Scene;
        constructor(scene: Phaser.Scene, id: number, reelFrame: string, winFrame: string) {
            this.id = id;
            this.scene=scene;
            this.reelAnim = reelFrame;
            this.winAnim = winFrame;
        }
        public createReelAnim(x: number,y: number):Phaser.GameObjects.Image{
          let img = this.scene.add.image(x,y, this.reelAnim);
          return img;
        }
        public createWinAnim(x: number,y: number){
            let img = this.scene.add.image(x,y, this.winAnim);
            let tween = this.scene.tweens.add({
                targets: img,
                alpha: 0,
                duration: 500,
                yoyo: true,
                
                onComplete: () => {
                    img.destroy();
                }
            });
            return img;
        }
    }