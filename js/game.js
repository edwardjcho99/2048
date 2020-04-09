// new Phaser Game Scene configurations
var config = {
  width: 600,
  height: 700,
  title: "2048",
  backgroundColor:0xdddddd,
  scene: [SplashScreen,MainScene],
  pixelArt: true,
};

// global variable
const TILESIZE = config.width / 4;

// enum defining directions
const directions = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

// global variable defining high score
highScore = 0;

// create a new game
var game = new Phaser.Game(config);
