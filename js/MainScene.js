// class defining the MainScene scene
class MainScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  // preloading spritesheet
  preload() {
    this.load.spritesheet("tiles","assets/images/tiles.png",{
      frameWidth: 200,
      frameHeight: 200
    });
  }

  create() {
    this.board = new Board(this);
    this.board.spawnTile();
    this.board.spawnTile();

    var graphics = this.add.graphics({ fillStyle:{ color: 0xcccccc } });
    var header = new Phaser.Geom.Rectangle(0, 0, config.width, 100);
    graphics.fillRectShape(header);

    this.score = 0;
    highScore = 0;

    // creating labels
    this.scoreLabel = this.add.text(5,-20,"SCORE:",{fontSize: "100px",fontFamily: "peepo"});
    this.scoreLabel.setOrigin(0,0);

    this.scoreLabelValue = this.add.text(config.width-5,-20,this.score,{fontSize: "100px",fontFamily: "peepo"});
    this.scoreLabelValue.setOrigin(1,0);

    // defining inputs
    this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  }

  // updates game state
  update() {

    // checks to see if a key is pressed
    // if so, swipe board in corresponding direction
    // then, check to see if the board is identical, if it is
    // then don't spawn a new tile
    if (Phaser.Input.Keyboard.JustDown(this.down)){
      var boardClone = [];
      for (var i = 0; i < this.board.board.length; i++){
        boardClone[i] = this.board.board[i].slice();
      }

      this.board.moveDown();
      if(!this.board.arrayEquals(boardClone)){
        this.board.spawnTile();
      }
      boardClone = null;
      console.log(this.board.checkGameOver());
    } else if (Phaser.Input.Keyboard.JustDown(this.up)){
      var boardClone = [];
      for (var i = 0; i < this.board.board.length; i++){
        boardClone[i] = this.board.board[i].slice();
      }

      this.board.moveUp();
      if(!this.board.arrayEquals(boardClone)){
        this.board.spawnTile();
      }
      boardClone = null;
      console.log(this.board.checkGameOver());
    } else if (Phaser.Input.Keyboard.JustDown(this.right)){
      var boardClone = [];
      for (var i = 0; i < this.board.board.length; i++){
        boardClone[i] = this.board.board[i].slice();
      }

      this.board.moveRight();
      if(!this.board.arrayEquals(boardClone)){
        this.board.spawnTile();
      }
      boardClone = null;
      console.log(this.board.checkGameOver());
    } else if (Phaser.Input.Keyboard.JustDown(this.left)){
      var boardClone = [];
      for (var i = 0; i < this.board.board.length; i++){
        boardClone[i] = this.board.board[i].slice();
      }

      this.board.moveLeft();
      if(!this.board.arrayEquals(boardClone)){
        this.board.spawnTile();
      }
      boardClone = null;
      console.log(this.board.checkGameOver());
    }

    // update the board
    this.board.update();

    // update the label
    this.scoreLabelValue.setText(this.score);

    // check to see if the game is over
    if (this.board.checkGameOver()){
      if (this.score > highScore){
        highScore = this.score;
      }
      this.scene.start("splashScreen");
    }
  }

}
