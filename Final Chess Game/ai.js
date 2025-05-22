function evaluateBoard() {
  const values = {
    pawn: 1,
    knight: 3.2,
    bishop: 3.3,
    rook: 5,
    queen: 9,
    king: 0
  };

  let score = 0;
  for (let p of pieces) {
    let value = values[p.piece] || 0;
    let bonus = 0;

   
    if (p.piece === 'pawn') {
      bonus += (p.color === 'white' ? p.col : 7 - p.col) * 0.1;
    }

    if (p.row >= 2 && p.row <= 5 && p.col >= 2 && p.col <= 5) {
      bonus += 0.1;
    }

    if (p.piece !== 'pawn' && (p.color === 'white' && p.col > 1) || p.color === 'black' && p.col < 6) {
      bonus += 0.05;
    }

    score += (value + bonus) * (p.color === 'white' ? 1 : -1);
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
    if (p.color !== color) {
      continue;
    }

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        
        const origRow = p.row;
        const origCol = p.col;
        const captured = pieceAt(r, c);

        selectedPiece = p;
        if (!legalMove(r, c)) {
          continue;
        }

        p.row = r;
        p.col = c;
        if (captured) {
          pieces = pieces.filter(x => x !== captured);
        }

        if (!isInCheck(color)) {
          moves.push({ piece: p, row: r, col: c, captured });
        }

        // Undo
        p.row = origRow;
        p.col = origCol;
        if (captured) {
          pieces.push(captured);
        }
      }
    }
  }

  return moves;
}

function minimax(depth, maximizingPlayer) {
  if (depth === 0 || gameOver) {
    return evaluateBoard();
  }

  const color = maximizingPlayer ? 'white' : 'black';
  const moves = generateLegalMoves(color);
  if (moves.length === 0) {
    return evaluateBoard();
  }

  let bestScore = maximizingPlayer ? -Infinity : Infinity;

  for (let move of moves) {
    makeMove(move);
    const randomness = Math.random() * 0.3; 
    const score = minimax(3, false) + randomness;

    undoMove(move);

    bestScore = maximizingPlayer
      ? Math.max(bestScore, score)
      : Math.min(bestScore, score);
  }

  return bestScore;
}

function aiMoveWhite() {
  if (currentTurn !== 'white' || gameOver) {
    return;
  }

  const moves = generateLegalMoves('white');
  let bestScore = -Infinity;
  let bestMoves = [];

  for (let move of moves) {
    makeMove(move);
    const score = minimax(3, false);  
    undoMove(move);

    
    if (score > bestScore - 0.2) {
      if (score > bestScore) {
        bestScore = score;
        bestMoves = [move];
      }
      else {
        bestMoves.push(move);
      }
    }
  }

  if (bestMoves.length > 0) {
    const chosen = random(bestMoves); 
    makeMove(chosen);

    if (chosen.piece.piece === 'pawn' && (chosen.piece.col === 0 || chosen.piece.col === 7)) {
      chosen.piece.piece = 'queen';
    }

    if (isCheckmate('black')) {
      gameOver = true;
      winner = 'white';
    }

    else {
      currentTurn = 'black';
    }
  }
}


