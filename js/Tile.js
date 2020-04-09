// class defining the Tile Sprite
class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene,x,y,value){
    super(scene,x * TILESIZE + 0.5 * TILESIZE,y * TILESIZE + 0.5 * TILESIZE + 100,"tiles");
    scene.add.existing(this);

    this.setOrigin(0.5,0.5);
    this.displayWidth = TILESIZE;
    this.scaleY = this.scaleX;
    this.scene = scene;

    this.posX = x;
    this.posY = y;

    this.lastPosX = this.posX;
    this.lastPosY = this.posY;

    // costume is the frame of the image in the sprite sheet
    this.costume = 0;

    this.value = value;
    if (value == 2) this.costume = 0;
    else if (value == 4) this.costume = 1;
    this.setFrame(this.costume);
  }

  // slide the Tile all the way to the edge or until it hits another Tile
  // input: Board, direction
  slide(board,direction){
    switch(direction){
      case directions.LEFT:
        while(this.posX > 0){
          if(board.board[this.posX - 1][this.posY] == null){
            board.board[this.posX- 1][this.posY] = board.board[this.posX][this.posY];
            board.board[this.posX][this.posY] = null;

            this.posX--;
          } else {
            break;
          }
        }
        break;
      case directions.RIGHT:
        while(this.posX < 3){
          if(board.board[this.posX + 1][this.posY] == null){
            board.board[this.posX + 1][this.posY] = board.board[this.posX][this.posY];
            board.board[this.posX][this.posY] = null;

            this.posX++;
          } else {
            break;
          }
        }
        break;
      case directions.UP:
        while(this.posY > 0){
          if(board.board[this.posX][this.posY - 1] == null){
            board.board[this.posX][this.posY - 1] = board.board[this.posX][this.posY];
            board.board[this.posX][this.posY] = null;

            this.posY--;
          } else {
            break;
          }
        }
        break;
      case directions.DOWN:
        while(this.posY < 3){
          if(board.board[this.posX][this.posY + 1] == null){
            board.board[this.posX][this.posY + 1] = board.board[this.posX][this.posY];
            board.board[this.posX][this.posY] = null;

            this.posY++;
          } else {
            break;
          }
        }
    }
  }

  // combines numbers
  combine(x,y,board){
    if (board.board[x][y].value == this.value){
      var tile = board.board[x][y];

      board.board[this.posX][this.posY] = null;
      tile.value *= 2;
      this.scene.score += tile.value;
      tile.costume++;
      tile.setFrame(tile.costume);

      // animation for combination
      this.scene.add.tween({
        targets: tile,
        scale: 1.0001,
        ease: 'Linear',
        duration: 50,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          tile.displayWidth = TILESIZE;
          tile.displayHeight = TILESIZE;
          this.destroy();
        },
      });
      this.setVisible(false);

    }
  }

  // updates state of tile
  update(){
    console.log("this.posX: " + this.posX);
    console.log("this.lastPosX: " + this.lastPosX);

    // if the piece moved, then do its slide animation
    if (this.posX != this.lastPosX){
      var tmpX = this.lastPosX;
      this.lastPosX = this.posX;
      this.moveAnim = this.scene.add.tween({
        targets: this,
        duration: 100,
        delay: 0,
        x: {
          getStart: () => (tmpX) * TILESIZE + 0.5 * TILESIZE,
          getEnd: () => (this.posX) * TILESIZE + 0.5 * TILESIZE,
        },
      });
    }
    if (this.posY != this.lastPosY){
      var tmpY = this.lastPosY;
      this.lastPosY = this.posY;
      this.moveAnim2 = this.scene.add.tween({
        targets: this,
        duration: 100,
        delay: 0,
        y: {
          getStart: () => (tmpY) * TILESIZE + 0.5 * TILESIZE + 100,
          getEnd: () => (this.posY) * TILESIZE + 0.5 * TILESIZE + 100,
        },
      });
    }
  }

}
