

function Grid(width, hiddenNumber, containerDiv) {
  this.width = width;  // grid is square
  this.hiddenNumber = hiddenNumber;  // number of tiles to hide
  this.containerDiv = containerDiv;  // id of the div containing the grid

  this.hiddenTiles = [];   // the tile IDs we're seeking
  this.foundTiles = 0;

  this.visibleTime = 1800;
}

Grid.prototype.build = function() {
  /* create a grid and hide some tiles
  */

  for (var i=0; i<this.width*this.width; i++) {
    $('#'+this.containerDiv).append('<div class="tile", id="tile' + i + '"></div>');

    if ((i+1) % this.width == 0) {   // next row 
      $('#'+this.containerDiv).append('<div class="clearfix"></div>');
    }
  }


  // loop until we've generated enough secret tiles
  while (this.hiddenTiles.length != this.hiddenNumber) {
    // create a secret tile in [0, width*width-1]
    var secretTile = Math.floor(Math.random()*(this.width*this.width));

    if (this.hiddenTiles.indexOf(secretTile) == -1) {  // it's new
      this.hiddenTiles.push(secretTile);
    }
  }

  this.show();
}


Grid.prototype.show = function() {
  /* show the hidden tiles, then hide em
  */

  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('selected');
  }

  var _grid = this
  setTimeout(function() {
    $('.tile').removeClass('selected');

    _grid.enableGuessing();

  }, this.visibleTime);
    
}
  

Grid.prototype.enableGuessing = function() {
  /* create click handlers for the squares
  * eh, maybe create them in build() then enable them or make the clicks visible?
  */
  var _grid = this;
  $('.tile').click(function() {

    var guess = this.id.split('tile')[1]*1;  // get the id, convert to number
    if (guess in oc(_grid.hiddenTiles)) {
      $(this).addClass('selected');
      _grid.foundTiles++;

      if (_grid.foundTiles == _grid.hiddenNumber) {
        _grid.win();
      }

    } else {
      _grid.lose();
    }

  });
}


Grid.prototype.lose = function() {
  /* bad guess -- show all hidden tiles, return zero to someone
  */
  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('defeated');
  }
  // remove click handlers
  $('.tile').unbind('click');
}


Grid.prototype.win = function() {
  /* caught 'em all, woo
  */
  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('victorious');
  }
  // lose the click handlers
  $('.tile').unbind('click');
}


function oc(a) {
  /* snook.ca's in array checker
  */
  var o = {};
  for(var i=0;i<a.length;i++) {
    o[a[i]]='';
  }
  return o;
}

