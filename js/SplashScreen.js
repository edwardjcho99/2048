// class defining the SplashScreen scene
class SplashScreen extends Phaser.Scene {
  constructor() {
    super("splashScreen");
  }

  // preload image(s)
  preload(){
    this.load.image("newgame","assets/images/newgame.png");
  }

  create(){
    // create a new game button
    this.newGameButton = this.add.image(config.width/2,(config.height-100)/2 + 100,"newgame");
    this.newGameButton.setOrigin(0.5,0.5);
    // makes the game button clickable
    this.newGameButton.setInteractive().on('pointerdown', function (event) {
      console.log("heelo");
      this.scene.start("playGame");
    },this);

    // create labels
    this.highScoreLabel = this.add.text(config.width/2,50,"HIGHSCORE:",{fontSize: "100px",fontFamily: "peepo"});
    this.highScoreLabel.setOrigin(0.5,0.5);

    this.highScoreLabelValue = this.add.text(config.width/2,150,highScore,{fontSize: "100px",fontFamily: "peepo"});
    this.highScoreLabelValue.setOrigin(0.5,0.5);


  }
}
