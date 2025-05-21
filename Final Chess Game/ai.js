

function evaluateBoard() {
  const values = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0,
  };

  let score = 0;
  for (let p of pieces) {
    if (p.piece in values) {
      score += values[p.piece] * (p.color === 'white' ? 1 : -1);
    }
  }
  return score;
}

function makeMove(move) {
  move.originalRow = move.piece.row;
  move.originalCol = move.piece.col;
  move.piece.row = move.row;
  move.piece.col = move.col;

  if (move.captured) {
    move.removed = move.captured;
    pieces = pieces.filter(p => p !== move.captured);
  }
}

function undoMove(move) {
  move.piece.row = move.originalRow;
  move.piece.col = move.originalCol;

  if (move.removed) {
    pieces.push(move.removed);
  }
}

