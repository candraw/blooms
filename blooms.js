var Blooms = function() {
  var LIGHT = 'l';
  var DARK = 'd';

  var MINT = 'm';
  var BLUE = 'b';
  var RED = 'r';
  var ORANGE = 'o';

  var board = new Array(7*7);
  var turn = LIGHT;
  var quarter_moves = 0;
  var move_history = [];
  var light_captures = 0;
  var dark_captures = 0;

  function clear() {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 7; j++) {
        board[i][j] = ' ';
      }
    }
  }

  function isWon() {
    return light_captures >= 15 || dark_captures >= 15;
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

    var location = m.loc;

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

  function isValidMove(m) {
    var coord = moveToCoord(m);
    var color = m.color;

    if (m.pass) {
      return (quarter_moves-1)%2 == 1;
    }

    var rightColor = false;
    if (turn == LIGHT) {
      rightColor = color == MINT || color == ORANGE;
    } else {
      rightColor = color == RED || color == BLUE;
    }

    return coordOnBoard(coord) && board[coordToIndex(coord)] == ' ';
  }

  function move(m) {
    var loc = m.loc;
    var color = m.color;

    if (isValidMove(m)) {
      if (!m.pass) {
        board[coordToIndex(coord)] = color;
      }

      quarter_moves++;

      if ((quarter_moves-1)%4 == 0 || (quarter_moves-1)%4 == 1) {
        turn = DARK;
      } else {
        turn = LIGHT;
      }

      move_history.push(m);

    } else {
      return false;
    }
  }
}
