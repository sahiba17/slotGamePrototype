import { GameConstants } from "../constants/gameConstants";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: GameConstants.PRELOAD_SCENE });
    
  }
  preload() {
    this.preloadDesktop();
  }
  create() {
    this.scene.start(GameConstants.BASEGAME_SCENE);
  }

  protected preloadDesktop() : void{
    
    this.load.image('btn', 'assets/btn/btn.png');

    this.load.image('sym9', 'assets/symbols/9.png');
    this.load.image('sym10', 'assets/symbols/10.png');
    this.load.image('symA', 'assets/symbols/A.png');
    this.load.image('symH1', 'assets/symbols/H1.png');
    this.load.image('symH2', 'assets/symbols/H2.png');
    this.load.image('symH3', 'assets/symbols/H3.png');
    this.load.image('symH4', 'assets/symbols/H4.png');
    this.load.image('symH5', 'assets/symbols/H5.png');
    this.load.image('symH6', 'assets/symbols/H6.png');
    this.load.image('symJ', 'assets/symbols/J.png');
    this.load.image('symK', 'assets/symbols/K.png');
    this.load.image('symM1', 'assets/symbols/M1.png');
    this.load.image('symM2', 'assets/symbols/M2.png');
    this.load.image('symM3', 'assets/symbols/M3.png');
    this.load.image('symM4', 'assets/symbols/M4.png');
    this.load.image('symM5', 'assets/symbols/M5.png');
    this.load.image('symM6', 'assets/symbols/M6.png');
    this.load.image('symQ', 'assets/symbols/Q.png');
    this.load.image('sym9_connect', 'assets/symbols/9_connect.png');
    this.load.image('sym10_connect', 'assets/symbols/10_connect.png');
    this.load.image('symA_connect', 'assets/symbols/A_connect.png');
    this.load.image('symH1_connect', 'assets/symbols/H1_connect.png');
    this.load.image('symH2_connect', 'assets/symbols/H2_connect.png');
    this.load.image('symH3_connect', 'assets/symbols/H3_connect.png');
    this.load.image('symH4_connect', 'assets/symbols/H4_connect.png');
    this.load.image('symH5_connect', 'assets/symbols/H5_connect.png');
    this.load.image('symH6_connect', 'assets/symbols/H6_connect.png');
    this.load.image('symJ_connect', 'assets/symbols/J_connect.png');
    this.load.image('symK_connect', 'assets/symbols/K_connect.png');
    this.load.image('symM1_connect', 'assets/symbols/M1_connect.png');
    this.load.image('symM2_connect', 'assets/symbols/M2_connect.png');
    this.load.image('symM3_connect', 'assets/symbols/M3_connect.png');
    this.load.image('symM4_connect', 'assets/symbols/M4_connect.png');
    this.load.image('symM5_connect', 'assets/symbols/M5_connect.png');
    this.load.image('symM6_connect', 'assets/symbols/M6_connect.png');
    this.load.image('symQ_connect', 'assets/symbols/Q_connect.png');

}
}


