function evaluateBoard() {
  const values = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0
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

function generateLegalMoves(color) {
  const moves = [];

  for (let p of pieces) {
    if (p.color !== color) continue;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        
        const origRow = p.row;
        const origCol = p.col;
        const captured = pieceAt(r, c);

        selectedPiece = p;
        if (!legalMove(r, c)) continue;

        p.row = r;
        p.col = c;
        if (captured) pieces = pieces.filter(x => x !== captured);

        if (!isInCheck(color)) {
          moves.push({ piece: p, row: r, col: c, captured });
        }

        // Undo
        p.row = origRow;
        p.col = origCol;
        if (captured) pieces.push(captured);
      }
    }
  }

  return moves;
}

function minimax(depth, maximizingPlayer) {
  if (depth === 0 || gameOver) return evaluateBoard();

  const color = maximizingPlayer ? 'white' : 'black';
  const moves = generateLegalMoves(color);
  if (moves.length === 0) return evaluateBoard();

  let bestScore = maximizingPlayer ? -Infinity : Infinity;

  for (let move of moves) {
    makeMove(move);
    const score = minimax(depth - 1, !maximizingPlayer);
    undoMove(move);

    bestScore = maximizingPlayer
      ? Math.max(bestScore, score)
      : Math.min(bestScore, score);
  }

  return bestScore;
}

function aiMoveWhite() {
  if (currentTurn !== 'white' || gameOver) return;

  const moves = generateLegalMoves('white');
  let bestScore = -Infinity;
  let bestMove = null;

  for (let move of moves) {
    makeMove(move);
    const score = minimax(1, false); 
    undoMove(move);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  if (bestMove) {
    makeMove(bestMove);

    if (bestMove.piece.piece === 'pawn' &&
        (bestMove.piece.col === 0 || bestMove.piece.col === 7)) {
      bestMove.piece.piece = 'queen';
    }

    if (isCheckmate('black')) {
      gameOver = true;
      winner = 'white';
    } else {
      currentTurn = 'black';
    }
  }
}
