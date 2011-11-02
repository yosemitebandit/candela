

function Grid(width, hiddenNumber, containerDiv) {
  this.width = width;  // grid is square
  this.hiddenNumber = hiddenNumber;  // number of tiles to hide
  this.containerDiv = containerDiv;  // id of the div containing the grid

  this.hiddenTiles = [];   // the tile IDs we're seeking

  this.visibleTime = 1000;
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

  console.log(this.hiddenTiles);

  this.show();
}


Grid.prototype.show = function() {
  /* show the hidden tiles, then hide em
  */

  for (var i in this.hiddenTiles) {
    $('#tile'+this.hiddenTiles[i]).addClass('selected');
  }

  setTimeout(function() {
    $('.tile').removeClass('selected');
  }, this.visibleTime);
    
}
  



