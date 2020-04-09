// class defining a board
class Board {
  constructor(scene){
    this.scene = scene;

    this.board = [];

    for (var col = 0; col < 4; col++){
      this.board.push([]);
      for (var row = 0; row < 4; row++){
        this.board[col][row] = null;
      }
    }

  }

  // randomly spawn a tile in the board
  spawnTile(){
    var openPositions = [];
    for (var col = 0; col < 4; col++){
      for (var row = 0; row < 4; row++){
        if(this.board[col][row] == null){
          openPositions.push([col,row]);
        }
      }
    }
    var index = Math.floor(Math.random() * Math.floor(openPositions.length));

    var value;
    var randInt = Math.floor(Math.random() * Math.floor(10));
    if (randInt < 8) value = 2;
    else value = 4;
    this.board[openPositions[index][0]][openPositions[index][1]] = new Tile(this.scene,openPositions[index][0],openPositions[index][1],value);
    this.board[openPositions[index][0]][openPositions[index][1]].displayWidth = 0;
    this.board[openPositions[index][0]][openPositions[index][1]].displayHeight = 0;
    var grow = this.scene.add.tween({
      targets: this.board[openPositions[index][0]][openPositions[index][1]],
      ease: 'Linear',
      duration: 100,
      yoyo: false,
      repeat: 0,
      displayWidth: {
        getStart: () => 0,
        getEnd: () => TILESIZE,
      },
      displayHeight: {
        getStart: () => 0,
        getEnd: () => TILESIZE,
      },
      delay: 50,
      onComplete: () => {
      },
    });
  }

  // swipe left
  moveLeft(){
    for (var combineIndex = 0; combineIndex < 3; combineIndex++){
      for (var y = 0; y < 4; y++){
        for (var x = 1; x < 4; x++){
          if (this.board[x][y] != null) this.board[x][y].slide(this,directions.LEFT);
        }
      }
      for (var row = 0; row < 4; row++){
        if (this.board[combineIndex + 1][row] != null && this.board[combineIndex][row] != null){
          this.board[combineIndex + 1][row].combine(combineIndex,row,this);
        }
      }
    }
  }

  // swipe right
  moveRight(){
    for (var combineIndex = 3; combineIndex > 0; combineIndex--){
      for (var y = 0; y < 4; y++){
        for (var x = 2; x >= 0; x--){
          if (this.board[x][y] != null) this.board[x][y].slide(this,directions.RIGHT);
        }
      }
      for (var row = 0; row < 4; row++){
        if (this.board[combineIndex - 1][row] != null && this.board[combineIndex][row] != null){
          this.board[combineIndex - 1][row].combine(combineIndex,row,this);
        }
      }
    }
  }

  // swipe up
  moveUp(){
    for (var combineIndex = 0; combineIndex < 3; combineIndex++){
      for (var x = 0; x < 4; x++){
        for (var y = 1; y < 4; y++){
          if (this.board[x][y] != null) this.board[x][y].slide(this,directions.UP);
        }
      }
      for (var col = 0; col < 4; col++){
        if (this.board[col][combineIndex + 1] != null && this.board[col][combineIndex] != null){
          this.board[col][combineIndex + 1].combine(col,combineIndex,this);
        }
      }
    }
  }

  // swipe down
  moveDown(){

    for (var combineIndex = 3; combineIndex > 0; combineIndex--){
      for (var x = 0; x < 4; x++){
        for (var y = 2; y >= 0; y--){
          if (this.board[x][y] != null) this.board[x][y].slide(this,directions.DOWN);
        }
      }
      for (var col = 0; col < 4; col++){
        if (this.board[col][combineIndex - 1] != null && this.board[col][combineIndex] != null){
          this.board[col][combineIndex - 1].combine(col,combineIndex,this);
        }
      }
    }
  }

  // checks to see if the array of tiles in this board is equivalent to an array
  // of tiles in another board.
  arrayEquals(other){
    for (var col = 0; col < 4; col++){
      for (var row = 0; row < 4; row++){
        if((this.board[col][row] != null && other[col][row] == null) ||
           (this.board[col][row] == null && other[col][row] != null)){
             return false;
           }
        if(this.board[col][row] != null && other[col][row] != null){
          if(this.board[col][row].value != other[col][row].value) {
            return false;
          }
        }
      }
    }
    return true;
  }

  //checks to see if the game is over
  checkGameOver(){
    //checks if there are any open spaces
    for (var col = 0; col < 4; col++){
      for (var row = 0; row < 4; row++){
        if(this.board[col][row] == null){
          return false;
        }
      }
    }

    //checks if any adjacent combines are available
    //horizontal
    for (var y = 0; y < 4; y++){
      for (var x = 1; x < 4; x++){
        if (this.board[x-1][y].value == this.board[x][y].value) return false;
      }
    }
    //vertical
    for (var x1 = 0; x1 < 4; x1++){
      for (var y1 = 1; y1 < 4; y1++){
        if (this.board[x1][y1-1].value == this.board[x1][y1].value) return false;
      }
    }
    return true;
  }

  // updates board state
  update(){
    for (var col = 0; col < 4; col++){
      for (var row = 0; row < 4; row++){
        if(this.board[col][row] != null){
          this.board[col][row].update();
        }
      }
    }
  }
}
