function BloomsBoard(game, boardid) {
  var board = document.getElementById(boardid);
  var context = board.getContext("2d");
  
  var size = 35;

  function handleClick(e) {
    var px = e.pageX - board.offsetLeft - 250;
    var py = e.pageY - board.offsetTop - 250;

    var x = (Math.sqrt(3)/3 * px - 1/3*py) / size;
    var y = 2/3*py/size;

    var rounded = hexRound({x: x, y: y});
    var side = x < rounded.x ? "left" : "right";

    console.log(rounded);
    
    if (game.getTurn() == game.RED) {
      if (side == "left") {
        game.move({loc: game.coordToLocation(rounded), color:game.RED});
      } else {
        game.move({loc: game.coordToLocation(rounded), color:game.ORANGE});
      }
    } else {
      if (side == "left") {
        game.move({loc: game.coordToLocation(rounded), color:game.BLUE});
      } else {
        game.move({loc: game.coordToLocation(rounded), color:game.MINT});
      }
    }

    draw();
  }

  function hexRound(c) {
    var rx = Math.round(c.x);
    var ry = Math.round(c.y);
    var rz = Math.round(-c.x - c.y);

    var dx = Math.abs(rx - c.x);
    var dy = Math.abs(ry - c.y);
    var dz = Math.abs(rz - c.z);

    if (dx > dy && dx > dz) {
      rx = -ry-rz;
    } else if (dy > dz) {
      ry = -rx-rz;
    } else {
      rz = -rx-ry;
    }

    return {x: rx, y: ry};
  }

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

  function draw() {
      context.fillStyle = 'white';
      context.rect(0, 0, 500, 500);
      context.fill();

      for (var i = 1; i <= 37; i++) {
        var coord = game.locationToCoord(i);
        var point = coordToPixel(coord);
        var color = pieceToColor(game.getFromLocation(i));

        drawHexagon(point.x, point.y, size, color);
      }
  }

  return {
    draw: function() {
      draw()
    },

    handleClick: function (e) {
      handleClick(e);
    },
  };
}
