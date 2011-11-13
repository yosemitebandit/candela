function Grid(width, hiddenNumber, game) {
  this.width = width;  // grid is square
  this.hiddenNumber = hiddenNumber;  // number of tiles to hide
  this.containerDiv = game.containerDiv;  // id of the div containing the grid
  this.game = game;

  this.hiddenTiles = [];   // the tile IDs we're seeking
  this.foundTiles = [];

  this.visibleTime = 1500;
}

Grid.prototype.build = function() {
  // create a grid
  for (var i=0; i<this.width*this.width; i++) {
    $('#'+this.containerDiv).append('<div class="tile", id="tile' + i + '"></div>');
    
    // make a new row every this.width
    if ((i+1) % this.width == 0) {
      $('#'+this.containerDiv).append('<div class="clearfix"></div>');
    }
  }

  // loop until we've generated enough secret tiles
  while (this.hiddenTiles.length != this.hiddenNumber) {
    // create a secret tile in [0, width*width-1]
    var secretTile = Math.floor(Math.random()*(this.width*this.width));
    // keep it if it's new
    if (this.hiddenTiles.indexOf(secretTile) == -1) {
      this.hiddenTiles.push(secretTile);
    }
  }

  // start the game
  this.start();
}


Grid.prototype.start = function() {
  // show the hidden tiles
  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('selected');
  }

  // hide the tiles and let the guessing begin
  var _grid = this
  setTimeout(function() {
    $('.tile').removeClass('selected');
    _grid.enableGuessing();
  }, this.visibleTime);
}
  

Grid.prototype.enableGuessing = function() {
  /* create click handlers for the squares
  */
  var _grid = this;
  $('.tile').click(function() {  
    // get the id, convert to number
    var guess = this.id.split('tile')[1]*1;

    // we've found a previously-unfound hidden tile
    if ((guess in oc(_grid.hiddenTiles)) && !(guess in oc(_grid.foundTiles))) {
      $(this).addClass('selected');
      _grid.foundTiles.push(guess);
      
      // have we won yet?
      if (_grid.foundTiles.length == _grid.hiddenTiles.length) {
        _grid.win();
      }

    // already found this one, do nothing
    } else if (guess in oc(_grid.foundTiles)) {
      // boop

    // bad guess, we lose
    } else {
      _grid.lose();
    }

  });
}


Grid.prototype.lose = function() {
  // show all hidden tiles
  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('defeated');
  }

  // remove click handlers
  $('.tile').unbind('click');

  // tell the high-level game that all is lost
  var _game = this.game;
  setTimeout(function() {
    _game.lose()
  }, 2000);
}


Grid.prototype.win = function() {
  // show all hidden tiles
  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('victorious');
  }

  // lose the click handlers
  $('.tile').unbind('click');

  // tell the high-level game that we won
  var _game = this.game;
  setTimeout(function() {
    _game.win()
  }, 2000);
}


Grid.prototype.destroy = function() {
  $('#' + this.containerDiv).html('');
}


function oc(a) {
  // snook.ca's trick for checking if a value's in an array -- make it a hash
  var o = {};
  for(var i=0;i<a.length;i++) {
    o[a[i]]='';
  }
  return o;
}

