function BloomsBoard(game, boardid) {
  var board = document.getElementById(boardid);
  var context = board.getContext("2d");

  function drawHexagon(x, y, size) {
    var dphi = Math.PI/3;
    var phi = Math.PI/6;
    context.moveTo(x + Math.cos(phi), y + Math.sin(phi));
    context.beginPath();

    for (var i = 0; i < 7; i++) {
      context.lineTo(x + (Math.cos(phi)*size), y + (Math.sin(phi)*size));
      phi += dphi;
    }

    context.fill();
  }

  return {
    draw: function() {
      drawHexagon(250, 250, 100);
    },
  };
}
