function BloomsBoard(game, boardid) {
  var board = document.getElementById(boardid);
  var context = board.getContext("2d");
  
  var size = 35;

  function pieceToColor(piece) {
    if (piece == 'm') {
      return 'cyan';
    } else if (piece == 'o') {
      return 'orange';
    } else if (piece == 'r') {
      return 'red';
    } else if (piece == 'b') {
      return 'blue';
    }

    return 'lightgrey';
  }

  function drawHexagon(x, y, size, color) {
    var dphi = Math.PI/3;
    var phi = Math.PI/6;
    context.moveTo(x + Math.cos(phi), y + Math.sin(phi));
    context.beginPath();

    size *= 0.9;

    for (var i = 0; i < 7; i++) {
      context.lineTo(x + (Math.cos(phi)*size), y + (Math.sin(phi)*size));
      phi += dphi;
    }

    context.fillStyle = color;
    context.fill();
  }

  function coordToPixel(c) {
    var x = c.x;
    var y = c.y;

    return {x: size*(Math.sqrt(3)*x + Math.sqrt(3)*y/2) + 250,
            y: 3/2*y*size+250};
  }

  return {
    draw: function() {
      for (var i = 1; i <= 37; i++) {
        var coord = game.locationToCoord(i);
        var point = coordToPixel(coord);
        var color = pieceToColor(game.getFromLocation(i));

        drawHexagon(point.x, point.y, size, color);
      }
    },
  };
}
