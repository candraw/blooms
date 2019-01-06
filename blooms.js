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
        board[i*7 + j] = ' ';
      }
    }
  }

  function isWon() {
    return light_captures >= 15 || dark_captures >= 15;
  }

  function coordToIndex(c) {
    var x = c.x + 3;
    var y = c.y + 3;

    return x + 7*y;
  }

  function coordOnBoard(c) {
    var x = c.x;
    var y = c.y;
    var z = -(x+y);

    return Math.abs(x) < 4 && Math.abs(y) < 4 && Math.abs(z) < 4;
  }

  function locationToCoord(loc) {
    // moves are numbers from 1 to 37
    // also don't hate me for this

    var ltoc = [{x:0,y:-3},
      {x:1,y:-3},
      {x:2,y:-3},
      {x:3,y:-3},

      {x:-1,y:-2},
      {x:0,y:-2},
      {x:1,y:-2},
      {x:2,y:-2},
      {x:3,y:-2},

      {x:-2,y:-1},
      {x:-1,y:-1},
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

    return ltoc[loc-1];
  }

  function coordToLocation(c) {
    if (c.y == -3)
      return c.x + 1;
    else if (c.y == -2)
      return c.x + 6;
    else if (c.y == -1)
      return c.x + 11;
    else if (c.y == 0)
      return c.x + 19;
    else if (c.y == 1)
      return c.x + 26;
    else if (c.y == 2)
      return c.x + 32;
    else if (c.y == 3)
      return c.x + 37;
  }

  function isValidMove(m) {
    var coord = locationToCoord(m.loc);
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

    // on second move check if color is different
    if (rightColor && (quarter_moves-1)%2==1) {
      rightColor = color != move_history[quarter_moves-1].color;
    }

    return coordOnBoard(coord) && board[coordToIndex(coord)] == ' ' && rightColor;
  }

  function move(m) {
    var loc = m.loc;
    var color = m.color;
    var coord = locationToCoord(loc);

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

      var groups = findGroups()
      console.log(groups)

      groups.forEach(function (group) {
        var locations = group.locations;
        var freedoms = group.freedoms;

        console.log(group);

        if (freedoms == 0) {
          locations.forEach( function(loc) {
            board[coordToIndex(locationToCoord(loc))] = ' ';
          });
        }
      });

    } else {
      return false;
    }
  }

  function getFromLocation(loc) {
    return board[coordToIndex(locationToCoord(loc))];
  }

  function locationNeighbors(loc) {
    var coord = locationToCoord(loc);
    var potentialNeighbors = [
      {x: coord.x-1, y:coord.y},
      {x: coord.x+1, y:coord.y},
      {x: coord.x, y:coord.y-1},
      {x: coord.x, y:coord.y+1},
      {x: coord.x+1, y:coord.y-1},
      {x: coord.x-1, y:coord.y+1},
    ];

    return potentialNeighbors.filter(coordOnBoard).map(coordToLocation);
  }

  function findGroups() {
    var groups = [];
    var visited = [];

    for (var loc = 1; loc <= 37; loc++) {
      var group = [];
      var toCheck = [loc];
      var color = getFromLocation(loc);
      var freedoms = 0;
      while (toCheck.length != 0) {
        var current = toCheck.pop();
        var currentColor = getFromLocation(current);

        var alreadyVisited = false;
        for (var v in visited) {
          if (v == current) {
            alreadyVisited = true;
          }
        }
        if (alreadyVisited) {
          continue;
        }

        if (currentColor == ' ') {
          freedoms++;
        }

        if (currentColor != color || currentColor == ' ') {
          continue;
        } else {
          group.push(current);
          visited.push(current);

          // add neighbors
          toCheck = toCheck.concat(locationNeighbors(current));
        }
      }

      if (group.length > 0) {
        groups.push({locations: group, freedoms:freedoms});
      }
    }

    return groups;
  }

  function ascii() {
    return board.toString();
  }

  function moves() {
    var m = [];
    var color = turn == LIGHT ? MINT : RED;
    for (var i = 1; i <= 37; i++) {
      if (isValidMove({loc:i, color:color})) {
        m.push(i);
      }
    }

    return m;
  }

  return {
    LIGHT:LIGHT,
    DARK:DARK,
    MINT:MINT,
    ORANGE:ORANGE,
    BLUE:BLUE,
    RED:RED,

    clear: function () {
      return clear();
    },

    ascii: function() {
      return ascii();
    },

    moves: function() {
      return moves();
    },

    move: function(m) {
      return move(m);
    },

    score: function() {
      return {light:light_captures, dark:dark_captures};
    },

    isWon: function() {
      return isWon();
    },

    isValidMove: function(m) {
      return isValidMove(m);
    },

    getFromLocation: function(loc) {
      return getFromLocation(loc);
    },

    locationToCoord: function(loc) {
      return locationToCoord(loc);
    }
  };
}
