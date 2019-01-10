var BloomsEngine = function (game, side, maxdepth) {
  function evaluate(game) {
    var score = game.score();
    var red = score.red;
    var blue = score.blue;
    var value = red - blue;

    return side==game.RED?value:-value;
  }

  function copy(game) {
    var newGame = Blooms();
    newGame.loadState(game.getState());

    return newGame;
  }

  function findMove() {
    if (game.getTurn() != side) {
      console.log("called on wrong turn");
      console.log(game.getTurn(), side);
      return;
    } else {
      var m = minimax(game, maxdepth, -100, 100);
      console.log(m);

      return m.move;
    }
  }

  function minimax(game, depth, alpha, beta) {
    if (depth == 0 || game.isWon()) {
      return {value:evaluate(game)};
    }

    var best;

    var maximising = game.getTurn() == side;
    if (maximising) {
      best = {value: -100};
      var moves = game.moves();

      for (var i = 0; i < moves.length; i++) {
        var move = moves[i];

        var node = copy(game);
        node.move(move);
        var evaluation = minimax(node, depth-1);

        if (evaluation.value > best.value) {
          best = {value:evaluation.value, move:move};
        }

        if (evaluation.value > alpha) {
          alpha = evaluation.value;
        }

        if (alpha >= beta) {
          break;
        }
      }
    } else {
      best = {value: 100};

      var moves = game.moves();

      for (var i = 0; i < moves.length; i++) {
        var move = moves[i];

        var node = copy(game);
        node.move(move);
        var evaluation = minimax(node, depth-1);

        if (evaluation.value < best.value) {
          best = {value:evaluation.value, move:move};
        }

        if (evaluation.value < beta) {
          beta = evaluation.value;
        }

        if (alpha >= beta) {
          break;
        }
      }
    }

    return best;
  }

  return {
    evaluate: function (game) {
      return evaluate(game);
    },

    findMove: function () {
      return findMove();
    },
  };
};
