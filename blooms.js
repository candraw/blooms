var Blooms = function() {
  var LIGHT = 'l';
  var DARK = 'd';

  var MINT = 'm';
  var BLUE = 'b';
  var RED = 'r';
  var ORANGE = 'o';

  var board = new Array(7*7);
  var turn = LIGHT;
  var half_moves = 0;
  var move_history = [];

  function clear() {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 7; j++) {
        board[i][j] = 0;
      }
    }
  }

  function coordToIndex(c) {
    var x = c.x + 3;
    var y = c.y + 3;

    return x + 7*(y - max(0, 4-x));
  }

  function coordOnBoard(c) {
    var x = c.x;
    var y = c.y;
    var z = -(x+y);

    return Math.abs(x) < 4 && Math.abs(y) < 4 && Math.abs(z) < 4;
  }

  function moveToCoord(m) {
    // moves are numbers from 1 to 37
    // also don't hate me for this
    var mtoc = [{x:0,y:-3},
      {x:1,y:-3},
      {x:2,y:-3},
      {x:2,y:-3},

      {x:-1,y:-2},
      {x:0,y:-2},
      {x:1,y:-2},
      {x:2,y:-2},
      {x:3,y:-2},

      {x:-2,y:-1},
      {x:-1,y:-2},
      {x:0,y:-1},
      {x:1,y:-1},
      {x:2,y:-1},
      {x:3,y:-1},

      {x:-3,y:0},
      {x:-2,y:0},
      {x:-1,y:0},
      {x:0,y:0},
      {x:1,y:0},
      {x:2,y:0},
      {x:3,y:0},

      {x:-3,y:1},
      {x:-2,y:1},
      {x:-1,y:1},
      {x:0,y:1},
      {x:1,y:1},
      {x:2,y:1},

      {x:-3,y:2},
      {x:-2,y:2},
      {x:-1,y:2},
      {x:0,y:2},
      {x:1,y:2},

      {x:-3,y:3},
      {x:-2,y:3},
      {x:-1,y:3},
      {x:0,y:3}];

    return mtoc[m-1];
  }
}
