// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

//add api 
// add pawn promotion
//add ui
//add stale mate

let thickness = 30;
let size;
let cam;
let chessBoard;
let woodTexture;
let boardData = [];
let row;
let col;
let wc;
let bc;
let pieces = [];
let selectedPiece = null;
let dragging = false;
let currentTurn = 'white';
let gameOver = false;
let winner = null;
let bgMusic;

let biB; let bk; let qb; let br; let bp; let bkni;
let biW; let wk; let qw; let wr; let wp; let wkni;
boardData = [//sets board up 
  [br, bkni, biB, qb, bk, biB, bkni, br],
  [bp, bp, bp, bp, bp, bp, bp, bp],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [wp, wp, wp, wp, wp, wp, wp, wp],
  [wr, wkni, biW, qw, wk, biW, wkni, wr]
];

function preload() {
  biB = loadModel('assets/Bishop - Copy.obj', true);
  biW = loadModel('assets/Bishop.obj', true);
  bk = loadModel('assets/King - Copy.obj', true);
  wk = loadModel('assets/King.obj', true);
  wkni = loadModel('assets/Knight.obj', true);
  bkni = loadModel('assets/Knight - Copy.obj', true);
  qw = loadModel('assets/Queen.obj', true);
  qb = loadModel('assets/Queen - Copy.obj', true);
  wp = loadModel('assets/Pawn.obj', true);
  bp = loadModel('assets/Pawn - Copy.obj', true);
  wr = loadModel('assets/Rook.obj', true);
  br = loadModel('assets/Rook - Copy.obj', true);
  woodTexture = loadImage('assets/woodtexture.jpg', true);
  bgMusic = loadSound('assets/music.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 100, 900);
  cam.lookAt(0, 0, 0);
  angleMode(DEGREES);



  size = min(width, height) / 10;
  chessBoard = new ChessBoard();
  chessBoard.createBoard(0, 0);

  createButton("Play Music").position(20, 20).mousePressed(() => {
    bgMusic.setLoop(true);
    bgMusic.setVolume(0.5);
    bgMusic.play();
  });
  createButton("Pause Music").position(20, 50).mousePressed(() => {
    bgMusic.stop();
  });
  //WHITE//
  pieces.push(new Pieces(0, 0, 'white', 'rook'));
  pieces.push(new Pieces(0, 1, 'white', 'knight'));
  pieces.push(new Pieces(0, 2, 'white', 'bishop'));
  pieces.push(new Pieces(0, 3, 'white', 'queen'));
  pieces.push(new Pieces(0, 4, 'white', 'king'));
  pieces.push(new Pieces(0, 5, 'white', 'bishop'));
  pieces.push(new Pieces(0, 6, 'white', 'knight'));
  pieces.push(new Pieces(0, 7, 'white', 'rook'));

  pieces.push(new Pieces(1, 0, 'white', 'pawn'));
  pieces.push(new Pieces(1, 1, 'white', 'pawn'));
  pieces.push(new Pieces(1, 2, 'white', 'pawn'));
  pieces.push(new Pieces(1, 3, 'white', 'pawn'));
  pieces.push(new Pieces(1, 4, 'white', 'pawn'));
  pieces.push(new Pieces(1, 5, 'white', 'pawn'));
  pieces.push(new Pieces(1, 6, 'white', 'pawn'));
  pieces.push(new Pieces(1, 7, 'white', 'pawn'));

  // BLACK//
  pieces.push(new Pieces(6, 0, 'black', 'pawn'));
  pieces.push(new Pieces(6, 1, 'black', 'pawn'));
  pieces.push(new Pieces(6, 2, 'black', 'pawn'));
  pieces.push(new Pieces(6, 3, 'black', 'pawn'));
  pieces.push(new Pieces(6, 4, 'black', 'pawn'));
  pieces.push(new Pieces(6, 5, 'black', 'pawn'));
  pieces.push(new Pieces(6, 6, 'black', 'pawn'));
  pieces.push(new Pieces(6, 7, 'black', 'pawn'));

  pieces.push(new Pieces(7, 0, 'black', 'rook'));
  pieces.push(new Pieces(7, 1, 'black', 'knight'));
  pieces.push(new Pieces(7, 2, 'black', 'bishop'));
  pieces.push(new Pieces(7, 3, 'black', 'queen'));
  pieces.push(new Pieces(7, 4, 'black', 'king'));
  pieces.push(new Pieces(7, 5, 'black', 'bishop'));
  pieces.push(new Pieces(7, 6, 'black', 'knight'));
  pieces.push(new Pieces(7, 7, 'black', 'rook'));

  
  //music();

}

// function music(){
//   if (keyCode === 32){
//   bgMusic.setLoop(true);
//   bgMusic.setVolume(0.5); 
//   bgMusic.play();
//   }
// }

function draw() {
  background(0);
  ambientLight(255);
  directionalLight(255, 255, 255, 0, 1, -1);
  let worldX = mouseX - width / 2;
  let worldY = mouseY - height / 2;


  for (let p of pieces) {
    p.display();
  }
  if (gameOver) {
    push();
    fill(255, 0, 0);

    console.log(`Game Over: ${winner} wins!`);
    pop();
  }

  // Variables to store the hovered square
  let hoveredX = 1;
  let hoveredY = 1;

  // Calculate grid position for X and Y

  if (worldX >= -size * 4 && worldX <= size * 4 &&
    worldY >= -size * 4 && worldY <= size * 4) {

    hoveredX = Math.floor((worldY + size * 4) / size);
    hoveredY = Math.floor((worldX + size * 4) / size);
  }
  //console.log('');
  chessBoard.makeSide();


  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let piece = boardData[row][col];

    }
  }

  chessBoard.drawBoard(0, 0, hoveredX, hoveredY);

}

function getBoardPosition(row, col, z = 60) {
  const x = -size * 4 + col * size + size / 2;
  const y = -size * 4 + row * size + size / 2;
  return { x, y, z };
}

//-------------------//
//     PIECES       //
//-------------------//
class Pieces {
  constructor(col, row, color, piece) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.piece = piece;

  }

  display() {
    push();
    let x, y, z = 60;
    if (this === selectedPiece && dragging) {
      x = mouseX - width / 2;
      y = mouseY - height / 2;
    }
    else {
      let pos = getBoardPosition(this.col, this.row);
      x = pos.x;
      y = pos.y;
    }

    translate(x, y, z);

    rotate(130);
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(202);
    stroke(110);
    scale(0.45);
    strokeWeight(0.8);
    switch (this.color) {
      case 'white':
        fill(215, 210, 225);
        specularMaterial(215, 210, 225); break;
      case 'black':
        fill(139, 69, 19);
        specularMaterial(139, 69, 19); break;
    }
    switch (this.piece) {
      case 'bishop':
        if (this.color === 'white') {
          model(biW);
        }
        else {
          model(biB);
        }
        break;

      case 'pawn':
        if (this.color === 'white') {
          model(wp);
        }
        else {
          model(bp);
        }
        break;

      case 'rook':
        if (this.color === 'white') {
          model(wr);
        }
        else {
          model(br);
        }
        break;

      case 'knight':
        if (this.color === 'white') {
          model(wkni);
        }
        else {
          model(bkni);
        }
        break;

      case 'king':
        if (this.color === 'white') {
          model(wk);
        }
        else {
          model(bk);
        }
        break;

      case 'queen':
        if (this.color === 'white') {
          model(qw);
        }
        else {
          model(qb);
        }
        break;
    }

    pop();

  }

}


function pieceAt(row, col) {
  return pieces.find(p => p.row === row && p.col === col);
}

function isPathClear(startRow, startCol, endRow, endCol) {
  let rowStep = Math.sign(endRow - startRow);
  let colStep = Math.sign(endCol - startCol);

  let row = startRow + rowStep;
  let col = startCol + colStep;

  while (row !== endRow || col !== endCol) {
    if (pieces.some(p => p.row === row && p.col === col)) {
      return false;
    }
    row += rowStep;
    col += colStep;
  }
  return true;
}


function mousePressed() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let col = Math.floor((y + size * 4) / size);
  let row = Math.floor((x + size * 4) / size);

  if (row >= 0 && row < 8 && col >= 0 && col < 8) {
    for (let p of pieces) {
      if (p.row === row && p.col === col && p.color === currentTurn) {
        selectedPiece = p;
        dragging = true;
        break;
      }
    }
  }
}

function legalMove(newRow, newCol) {

  if (!selectedPiece || selectedPiece.color !== currentTurn) {

    return false;
  }
  if (!(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)) {

    return false;
  }

  const target = pieces.find(p => p.col === newCol && p.row === newRow);
  if (target && target.color === selectedPiece.color) {

    return false;
  }

  const dr = newCol - selectedPiece.col;  // ****Flip column and row logic
  const dc = newRow - selectedPiece.row;  // ****Flip column and row logic


  switch (selectedPiece.piece) {
    case 'pawn':
      const dir = selectedPiece.color === 'white' ? 1 : -1;
      const startCol = selectedPiece.color === 'white' ? 1 : 6;


      if (dc === 0 && !target) {
        // forward
        if (dr === dir || selectedPiece.col === startCol && dr === 2 * dir &&
          !pieces.some(p => p.col === selectedPiece.col + dir && p.row === selectedPiece.row)) {

          return true;
        }
      }
      else if (Math.abs(dc) === 1 && dr === dir && target && target.color !== selectedPiece.color) {

        // Diagonal 
        return true;
      }

      return false;

    case 'rook':
      if (dr === 0 || dc === 0) {
        return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
      }
      return false;

    case 'bishop':
      if (Math.abs(dr) === Math.abs(dc)) {
        return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
      }
      return false;

    case 'queen':
      if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
        return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
      }
      return false;

    case 'king':
      return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

    case 'knight':
      return Math.abs(dr) === 2 && Math.abs(dc) === 1 || Math.abs(dr) === 1 && Math.abs(dc) === 2;

  }

}

// Checks if the king of the given color is under attack
function isInCheck(color) {
  // Find the king of the given color
  const king = pieces.find(p => p.piece === 'king' && p.color === color);
  if (!king) {
    return false;
  } // If king is missing (shouldn't happen), return false

  // Check if any enemy piece can move to the king's position
  for (let p of pieces) {
    if (p.color !== color) {
      const originalSelected = selectedPiece;
      selectedPiece = p; // Temporarily treat this enemy piece as selected

      // If this piece can legally move to the king's square
      if (legalMove(king.row, king.col)) {
        selectedPiece = originalSelected; // Restore previous selection
        return true; // King is in check
      }

      selectedPiece = originalSelected; // Restore previous selection
    }
  }

  return false; // No enemy piece can attack the king
}


// Checks if the given color is in checkmate (king is in check and no legal moves save it)
function isCheckmate(color) {
  // If king is not in check, it's not checkmate
  if (!isInCheck(color)) {
    return false;
  }

  // Loop through all pieces of this color
  for (let p of pieces) {
    if (p.color !== color) {
      continue;
    } // Skip enemy pieces

    // Try moving this piece to every square on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const originalRow = p.row;
        const originalCol = p.col;
        const captured = pieceAt(r, c); // Check if we are capturing anyone

        selectedPiece = p; // Try to move this piece
        if (legalMove(r, c)) {
          // Simulate the move
          p.row = r;
          p.col = c;
          if (captured) {
            pieces = pieces.filter(x => x !== captured);
          } // Temporarily remove captured piece

          const inCheck = isInCheck(color); // After the move, are we still in check?

          // Undo the move
          p.row = originalRow;
          p.col = originalCol;
          if (captured) {
            pieces.push(captured);
          } // Restore captured piece

          if (!inCheck) {
            selectedPiece = null;
            return false; // Found a move that saves the king -> not checkmate
          }
        }

        selectedPiece = null; // Reset selection
      }
    }
  }

  return true; // Tried all moves, none save the king -> checkmate
}


function mouseReleased() {
  if (gameOver) {
    return;
  }

  if (dragging && selectedPiece) {

    let x = mouseX - width / 2;
    let y = mouseY - height / 2;
    let newCol = Math.floor((y + size * 4) / size);
    let newRow = Math.floor((x + size * 4) / size);


    newRow = constrain(newRow, 0, 7);
    newCol = constrain(newCol, 0, 7);


    if (legalMove(newRow, newCol)) {
      // Remove any enemy piece at the target square (capture)
      pieces = pieces.filter(p => !(p.row === newRow && p.col === newCol && p.color !== selectedPiece.color));

      // Move the selected piece to the new square
      selectedPiece.row = newRow;
      selectedPiece.col = newCol;

      // Check if opponent is in checkmate after this move
      const opponentColor = currentTurn === 'white' ? 'black' : 'white';
      if (isCheckmate(opponentColor)) {
        gameOver = true;
        winner = currentTurn;
      }
      else {
        // No checkmate, switch turns
        currentTurn = opponentColor;
      }
    }
  }

  // Always reset dragging and selection after releasing mouse
  selectedPiece = null;
  dragging = false;
}




class ChessBoard {
  constructor() {
    this.board = [];
  }

  createBoard(row, col) {
    if (row >= 8) {
      return;
    }

    if (!this.board[row]) {
      this.board[row] = [];
    }

    let lightColor = color('#c7c9c8');
    let darkColor = color('#2b1101');

    this.board[row][col] = (row + col) % 2 === 0 ? lightColor : darkColor;

    if (col < 7) {
      this.createBoard(row, col + 1);
    }
    else {
      this.createBoard(row + 1, 0);
    }
  }

  makeSide() {
    push();
    noStroke();
    texture(woodTexture);

    translate(0, -size * 3.75 - size / 2, 0);
    box(size * 8 + size, size / 2, thickness);

    translate(0, size * 8 + size / 2, 0);
    box(size * 8 + size, size / 2, thickness);

    translate(-(size * 3.75 + size / 2), -size * 3.75 - size / 2, 0);
    rotateZ(90);
    box(size * 8 + size, size / 2, thickness);

    translate(0, -(size * 8 + size / 2), 0);
    box(size * 8 + size, size / 2, thickness);

    pop();
  }

  drawBoard(row, col, hoveredX, hoveredY) {
    if (row >= 8) {
      return;
    }

    push();
    translate(-size * 4 + col * size + size / 2, -size * 4 + row * size + size / 2, 0);

    if (row === hoveredX && col === hoveredY) {
      fill(0, 255, 0); // Green square when hovered
    }
    else {

      fill(this.board[row][col]);

    }

    noStroke();
    box(size, size, thickness);
    pop();

    if (col < 7) {
      this.drawBoard(row, col + 1, hoveredX, hoveredY);
    }
    else {
      this.drawBoard(row + 1, 0, hoveredX, hoveredY);
    }
  }
}



function simulateCheckmate() {
  pieces = []; // Clear all existing pieces

  // White pieces
  pieces.push(new Pieces(0, 0, 'white', 'rook'));  // White Rook on a1
  pieces.push(new Pieces(7, 4, 'white', 'king'));  // White King on e1

  // Black pieces
  pieces.push(new Pieces(0, 7, 'black', 'king'));  // Black King on h8
  pieces.push(new Pieces(7, 7, 'black', 'queen'));  // Black Queen on h7
  pieces.push(new Pieces(6, 7, 'black', 'pawn'));  // Black Pawn on h6

  currentTurn = 'white'; // Make sure it's white's turn to move
}

function keyPressed() {
  if (key === 'D' || key === 'd') {
    simulateCheckmate();
  }
}