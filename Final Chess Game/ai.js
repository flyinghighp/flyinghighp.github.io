function evaluateBoard() {
  const values = {
    Pawn: 1,
    Knight: 3.2,
    Bishop: 3.3,
    Rook: 5,
    Queen: 9,
    King: 0  // we don’t give points for the King here since checkmate is scored separately
  };

  // Give a huge bonus if the AI checkmates, and punish if it causes a stalemate
  if (isCheckmate('Black')) {
    return 1000;
  }
  if (isStalemate('Black')) {
    return -50;
  }

  let score = 0;

  for (let p of pieces) {
    let value = values[p.piece] || 0;
    let bonus = 0;

    // Bonus for controlling the center of the board — central control is powerful
    if (p.row >= 2 && p.row <= 5 && p.col >= 2 && p.col <= 5) {
      bonus += 0.2;
    }

    // Pawns get a bonus the further they’ve advanced
    if (p.piece === 'Pawn') {
      bonus += (p.color === 'White' ? p.col : 7 - p.col) * 0.1;
    }

    // Penalize the King if it’s too exposed — fewer friendly pieces nearby
    if (p.piece === 'King') {
      const surrounding = [
        pieceAt(p.row - 1, p.col), pieceAt(p.row + 1, p.col),
        pieceAt(p.row, p.col - 1), pieceAt(p.row, p.col + 1)
      ];
      let defenders = surrounding.filter(x => x && x.color === p.color).length;
      if (defenders < 2) {
        bonus -= 0.3;
      }
    }

    // Small bonus if this piece is protected by another friendly piece
    for (let ally of pieces) {
      if (ally.color === p.color && ally !== p) {
        let dx = Math.abs(ally.row - p.row);
        let dy = Math.abs(ally.col - p.col);
        if (dx <= 1 && dy <= 1) {
          bonus += 0.05;
        }
      }
    }

    // White pieces add to the score, Black pieces subtract
    score += (value + bonus) * (p.color === 'White' ? 1 : -1);
  }

  return score;
}

function makeMove(move) {
  // Save the original position in case we want to undo
  move.originalRow = move.piece.row;
  move.originalCol = move.piece.col;

  // Move the piece
  move.piece.row = move.row;
  move.piece.col = move.col;

  // If there's a captured piece, remove it from the board
  if (move.captured) {
    move.removed = move.captured;
    pieces = pieces.filter(p => p !== move.captured);
  }
}

function undoMove(move) {
  // Put the piece back to where it was
  move.piece.row = move.originalRow;
  move.piece.col = move.originalCol;

  // If we removed a piece earlier, bring it back
  if (move.removed) {
    pieces.push(move.removed);
  }
}

function generateLegalMoves(color) {
  const moves = [];

  for (let p of pieces) {
    if (p.color !== color) {
      continue;
    }  // skip opponent pieces

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const origRow = p.row;
        const origCol = p.col;
        const captured = pieceAt(r, c);

        selectedPiece = p;

        // Skip if the move isn’t legal
        if (!legalMove(r, c)) {
          continue;
        }

        // Try the move temporarily
        p.row = r;
        p.col = c;
        if (captured) {
          pieces = pieces.filter(x => x !== captured);
        }

        // Only keep the move if it doesn’t leave the King in check
        if (!isInCheck(color)) {
          moves.push({ piece: p, row: r, col: c, captured });
        }

        // Undo the temporary move
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
    return evaluateBoard();  // base case: evaluate this board position
  }

  const color = maximizingPlayer ? 'White' : 'Black';
  const moves = generateLegalMoves(color);
  if (moves.length === 0) {
    return evaluateBoard();  // no legal moves, return score
  }

  let bestScore = maximizingPlayer ? -Infinity : Infinity;

  for (let move of moves) {
    makeMove(move);

    let score = minimax(depth - 1, !maximizingPlayer);

    // Add a small random value to avoid repetitive AI behavior
    score += (Math.random() - 0.5) * 0.1;

    undoMove(move);

    // Pick the best or worst score depending on who's playing
    bestScore = maximizingPlayer
      ? Math.max(bestScore, score)
      : Math.min(bestScore, score);
  }

  return bestScore;
}

function aiMoveWhite() {
  if (currentTurn !== 'White' || gameOver) {
    return;
  }

  const moves = generateLegalMoves('White');
  let bestScore = -Infinity;
  let bestMoves = [];

  for (let move of moves) {
    // Bonus for capturing valuable pieces
    let captureBonus = 0;
    if (move.captured) {
      const captureValues = {
        Pawn: 1,
        Knight: 3.2,
        Bishop: 3.3,
        Rook: 5,
        Queen: 9
      };
      captureBonus = captureValues[move.captured.piece] || 0;
    }

    makeMove(move);
    const score = minimax(4, false) + captureBonus * 0.3;
    undoMove(move);

    // Collect best-scoring moves (not just one)
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

  // Randomly choose from equally strong options
  if (bestMoves.length > 0) {
    const chosen = random(bestMoves); 
    makeMove(chosen);
    moveMusic.setVolume(1);
    moveMusic.play();

    // Promote Pawns that reach the back rank
    if (chosen.piece.piece === 'Pawn' && (chosen.piece.col === 0 || chosen.piece.col === 7)) {
      chosen.piece.piece = 'Queen';
    }

    const opponentColor = 'Black';

    // Check for checkmate
    if (isCheckmate(opponentColor)) {
      gameOver = true;
      winner = 'White';
    }
    // Check for stalemate
    if (isStalemate(opponentColor)) {
      
      gameOver = true;
      winner = 'draw';
    }
    else {
      currentTurn = opponentColor;
    }

  }
  
}
