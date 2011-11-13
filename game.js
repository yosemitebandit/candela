function Game(containerDiv) {
  this.containerDiv = containerDiv;
  this.width = 3;
  this.hiddenTiles = 4;
}

Game.prototype.start = function() {
  var _game = this;
  this.grid = new Grid(this.width, this.hiddenTiles, _game);
  this.grid.build();
}

Game.prototype.restart = function() {
  this.grid.destroy();
  this.start();
}

Game.prototype.win = function() {
  // play again but make it more difficult
  this.width++;
  this.hiddenTiles++;

  this.restart();
}

Game.prototype.lose = function() {
  // play again but make it easier
  this.width--;
  this.hiddenTiles--;
  if (this.width < 3) {
    this.width = 3;
    this.hiddenTiles = 4;
  }

  this.restart();
}

  

 


