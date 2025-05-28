// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

let aiThinking = false;
let gameState = 'menu';  
let startBtn;
let puzzBtn;
let ovoBtn;
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
let whiteWinImg, blackWinImg, stalemateImg;
let promotionPending = false;
let promotionPiece = null;
let promotionButtons = [];
let promotionInProgress = false;

let biB; let bk; let qb; let br; let bp; let bkni;
let biW; let wk; let qw; let wr; let wp; let wkni;

let startGif;



function preload() {
  startGif = loadImage("assets/startPage.gif");
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
  bgMusic = loadSound('assets/music.mp3');
  woodTexture = loadImage('assets/woodtexture.jpg', true);
  whiteWinImg = loadImage("assets/whiteWins.png");
  blackWinImg = loadImage("assets/blackWins.png");
  stalemateImg = loadImage("assets/stalemate.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCamera();
  cam.setPosition(0, 100, 900);
  cam.lookAt(0, 0, 0);
  angleMode(DEGREES);
  
  startBtn = createButton('Play Vs Ai');
  startBtn.addClass('start-ui');
  startBtn.mousePressed(() => {
    gameState = 'play';
    puzzBtn.hide();
    startBtn.hide();
    ovoBtn.hide();
    resignBtn.show();
    document.getElementById("gifBackground").style.display = "none";
  });


  puzzBtn = createButton('Puzzles');
  puzzBtn.addClass('start-ui');
  puzzBtn.position(width/2, height/2+100); 
  puzzBtn.mousePressed(() => {
    gameState = 'puzzle';
    startPuzzles();
    resignBtn.hide();
    puzzBtn.hide();
    startBtn.hide();
    ovoBtn.hide();
    document.getElementById("gifBackground").style.display = "none";
  });

  ovoBtn = createButton('1 V 1');
  ovoBtn.addClass('start-ui');
  ovoBtn.position(width/2, height/2-100); 
  ovoBtn.mousePressed(() => {
    gameState = 'ovo';
    puzzBtn.hide();
    startBtn.hide();
    resignBtn.show();
    ovoBtn.hide();
    document.getElementById("gifBackground").style.display = "none";
  });

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

  
  resignBtn = createButton("RESIGN");
  resignBtn.position(width/2+100, 26);
  resignBtn.mousePressed(() => {
    gameOver = true;
    winner = 'white';
  });
  resignBtn.hide();

  
  //WHITE
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
}

function draw() {

  if (gameState === 'menu') {
    
    background(30);
    return; 
  }
  
  if(!gameOver || gameState === 'puzzle'){
    background(0);
    ambientLight(255);
    directionalLight(255, 255, 255, 0, 1, -1);
    let worldX = mouseX - width / 2;
    let worldY = mouseY - height / 2;
    for (let p of pieces) {
      p.display();
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
    chessBoard.makeSide();



    chessBoard.drawBoard(0, 0, hoveredX, hoveredY);
  }

  if (gameState === 'puzzle') {
    const opp = currentTurn === 'white' ? 'black' : 'white';
    if (isCheckmate(opp)) {
      setTimeout(() => {
        alert("Puzzle solved!");
        loadNextPuzzle();     
      }, 3);
    }
  }


  if (!gameOver && gameState === 'play') {
    
    updateScoreDisplay();
    
    const opp = currentTurn === 'white' ? 'black' : 'white';
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
    }
    
    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
    }


    if (currentTurn === 'white' && !aiThinking) {
      aiThinking = true;
      setTimeout(() => {
        aiMoveWhite();
        aiThinking = false;
      }, 100);
    }

  }

  if (!gameOver && gameState === 'ovo') {
    updateScoreDisplay();

    resignBtn.hide();

    const opp = currentTurn === 'white' ? 'black' : 'white';
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
    }
    
    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
    }


    if (gameOver) {
      cam.setPosition(0, 0, 500);
      cam.lookAt(0, 0, 0);
      imageMode(CENTER);
      resignBtn.hide();

      if (winner === 'white') {
        image(whiteWinImg, 0, 0, windowWidth, windowHeight); 
      }

      else if (winner === 'black') {
        image(blackWinImg, 0, 0, windowWidth, windowHeight);
      }
      else  {
        image(stalemateImg, 0, 0, windowWidth/2, windowHeight*0.5+100);
        console.log("Stalemate");
      }
    
    
    }
  }


  if (gameOver) {
    cam.setPosition(0, 0, 500);
    cam.lookAt(0, 0, 0);
    imageMode(CENTER);
    resignBtn.hide();

    if (winner === 'white') {
      image(whiteWinImg, 0, 0, windowWidth, windowHeight); 
    }

    else if (winner === 'black') {
      image(blackWinImg, 0, 0, windowWidth, windowHeight);
    }
    else  {
      image(stalemateImg, 0, 0, windowWidth/2, windowHeight*0.5+100);
      console.log("Stalemate");
    }
    
    
  }
}

function getBoardPosition(row, col, z = 60) {
  const x = -size * 4 + col * size + size / 2;
  const y = -size * 4 + row * size + size / 2;
  return { x, y, z };
}

function updateScoreDisplay() {
  const scoreDiv = document.getElementById("scoreDisplay");

  
  if (gameState !== 'play' && gameState !== 'ovo') {
    scoreDiv.style.display = "none";
    return;
  }
  
  else {
    scoreDiv.style.display = "block";
  }

  const pieceValues = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9
  };

  const initialCounts = {
    white: { pawn: 8, knight: 2, bishop: 2, rook: 2, queen: 1 },
    black: { pawn: 8, knight: 2, bishop: 2, rook: 2, queen: 1 }
  };

  for (let p of pieces) {
    if (p.piece in pieceValues) {
      initialCounts[p.color][p.piece]--;
    }
  }

  let whiteScore = 0;
  let blackScore = 0;

  for (let piece in pieceValues) {
    whiteScore += initialCounts.black[piece] * pieceValues[piece];
    blackScore += initialCounts.white[piece] * pieceValues[piece];
  }

  scoreDiv.innerText = `White: ${whiteScore} | Black: ${blackScore}`;
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
  
  if (gameState === 'menu') {
    return;
  }
  

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
  if (target && target.piece === 'king') {
    return false;
  } 
  if (target && target.color === selectedPiece.color) {
    return false;
  }

  if (target && target.color === selectedPiece.color){
    
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


function legalMove2(currPiece, newRow, newCol) {
  //THE FIX YAY!!!! WORKS NOW :)
  if (!currPiece) {
    return false;
  }
  if (!(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)) {
    return false;
  }

  const target = pieces.find(p => p.col === newCol && p.row === newRow);
  // Cannot capture own pieces or own king
  if (target && target.piece === 'king' && target.color === currPiece.color) {
    return false;
  }
  if (target && target.color === currPiece.color) {
    return false;
  }

  const dr = newCol - currPiece.col;  // ****Flip column and row logic (unchanged)
  const dc = newRow - currPiece.row;  // ****Flip column and row logic (unchanged)

  switch (currPiece.piece) {
  case 'pawn':
    const dir = currPiece.color === 'white' ? 1 : -1;
    const startCol = currPiece.color === 'white' ? 1 : 6;
    // Forward move
    if (dc === 0 && !target) {
      if (dr === dir || currPiece.col === startCol && dr === 2 * dir &&
            !pieces.some(p => p.col === currPiece.col + dir && p.row === currPiece.row)) {
        return true;
      }
    }
    // Diagonal capture
    else if (Math.abs(dc) === 1 && dr === dir && target && target.color !== currPiece.color) {
      return true;
    }
    return false;

  case 'rook':
    if (dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'bishop':
    if (Math.abs(dr) === Math.abs(dc)) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'queen':
    if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'king':
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

  case 'knight':
    return Math.abs(dr) === 2 && Math.abs(dc) === 1 ||
             Math.abs(dr) === 1 && Math.abs(dc) === 2;
  }
}

function isInCheck(color) {
  // Find the king 
  const king = pieces.find(p => p.piece === 'king' && p.color === color);
  if (!king) {
    return false;
  } 
  // Check if any enemy piece can move to the king's position
  for (let p of pieces) {
    if (p.color !== color) {
      if (legalMove2(p,king.row, king.col)) {
        return true; 
      }
    }
  }

  return false; // No enemy piece can attack the king
}

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
        const captured = pieceAt(r, c); 

        selectedPiece = p; // Try to move this piece
        if (legalMove2(p,r, c)) {
          
          p.row = r;
          p.col = c;
          if (captured) {
            pieces = pieces.filter(x => x !== captured);
          } 

          const inCheck = isInCheck(color); // After the move, are we still in check?

          // Undo the move
          p.row = originalRow;
          p.col = originalCol;
          if (captured) {
            pieces.push(captured);
          } // Restore captured piece

          if (!inCheck) {
            selectedPiece = null;
            return false;
          }
        }

        selectedPiece = null; 
      }
    }
  }

  return true; // Tried all moves, none save the king -> checkmate
}

function isStalemate(color) {
  if (isInCheck(color)) {
    return false; // Not stalemate if player is in check
  }

  // Loop through all pieces of this color
  for (let p of pieces) {
    if (p.color !== color){
      continue;
    }

    const originalRow = p.row;
    const originalCol = p.col;

    // Try moving this piece to every square on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const captured = pieceAt(r, c);

        if (legalMove2(p, r, c)) {
          // Make the move
          p.row = r;
          p.col = c;
          if (captured) {
            pieces = pieces.filter(x => x !== captured);
          }

          const stillInCheck = isInCheck(color);

          // Undo the move
          p.row = originalRow;
          p.col = originalCol;
          if (captured) {
            pieces.push(captured);
          }

          if (!stillInCheck) {
            return false; // Found at least one legal move that doesn't leave king in check
          }
        }
      }
    }
  }

  gameOver = true; // Had to add it beacuse there was a bug that I coudn't figure out so added it to work arounf the bug
  return true; // No legal moves and not in check => stalemate
  
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
      const originalRow = selectedPiece.row;
      const originalCol = selectedPiece.col;
      const captured = pieceAt(newRow, newCol);

      selectedPiece.row = newRow;
      selectedPiece.col = newCol;
      if (captured) {
        pieces = pieces.filter(p => p !== captured);
      }

      // Check if move puts self in check (illegal)
      if (isInCheck(currentTurn)) {
        selectedPiece.row = originalRow;
        selectedPiece.col = originalCol;
        if (captured) {
          pieces.push(captured);
        }
        selectedPiece = null;
        dragging = false;
        return;
      }

      // Handle pawn promotion
      if (selectedPiece.piece === 'pawn' &&
         (selectedPiece.col === 0 || selectedPiece.col === 7)) {
        pawnPromotion();
      }
      else {
        const opponentColor = currentTurn === 'white' ? 'black' : 'white';

        // Check for checkmate
        if (isCheckmate(opponentColor)) {
          gameOver = true;
          winner = currentTurn;
        }
        // Check for stalemate
        if (isStalemate(opponentColor)) {
          gameOver = true;
          winner = 'draw';
          console.log("Stalemate! The game is a draw.");
        }

        else {
          currentTurn = opponentColor;
          if (gameState === 'play' && currentTurn === 'white') {
            aiThinking = true;
            setTimeout(() => {
              aiMoveWhite();
              aiThinking = false;
            }, 10);
          }
        }

        selectedPiece = null;
      }
    }
  }

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
 
function pawnPromotion() {
  
  if (!promotionInProgress) {
    promotionInProgress = true;

    let q = createButton("Queen").position(width / 2, 20);
    let r = createButton("Rook").position(width / 2, 50);
    let b = createButton("Bishop").position(width / 2, 80);
    let k = createButton("Knight").position(width / 2, 110);

    function promoteTo(pieceType) {
      selectedPiece.piece = pieceType;
      promotionInProgress = false;

      q.remove();
      r.remove();
      b.remove();
      k.remove();


      //RECHECK THE CHECKMATE AND RETURN THE WINNER IF AFTER THE PAWN PROMOTION KING HAS BEEN GIVEN A CHECKMATE
      //As in the mouse released function the checkmate is called after a leagal move
      // to prevent the program from crashing out this detection was added 
      const opponentColor = currentTurn === 'white' ? 'black' : 'white';
      if (isCheckmate(opponentColor)) {
        gameOver = true;
        winner = currentTurn;
      }
      else if (isStalemate) {
        gameOver = true;
        winner = 'draw';
      }
      else {
        currentTurn = opponentColor;
      }

      selectedPiece = null; 
    }

    q.mousePressed(() => promoteTo("queen"));
    r.mousePressed(() => promoteTo("rook"));
    b.mousePressed(() => promoteTo("bishop"));
    k.mousePressed(() => promoteTo("knight"));
  }
}

//For Testing Purposes

function simulateCheckmate() {
  pieces = []; 
  gameState = 'testing'; 

  // White pieces
  pieces.push(new Pieces(1, 3, 'white', 'rook'));  
  pieces.push(new Pieces(2, 0, 'white', 'king'));  

  // Black pieces
  pieces.push(new Pieces(0, 0, 'black', 'king'));  
  pieces.push(new Pieces(6, 7, 'black', 'pawn'));  

  currentTurn = 'white'; 
}

function setupStalemateTest() {
  pieces = [];
  gameState = 'testing'; 
  // White king on f7 (row 1, col 5)
  pieces.push(new Pieces( 1, 5, 'white', 'king'));

  // White queen on g6 (row 2, col 6)
  pieces.push(new Pieces( 2, 6, 'white','queen'));

  // Black king on h8 (row 0, col 7)
  pieces.push(new Pieces( 0, 7, 'black','king'));
  currentTurn = 'black'; 
  
  console.log("Stalemate for black?", isStalemate('black'));
}


function pawnpro() {
  pieces = []; 
  gameState = 'testing'; 
  // White pieces
  pieces.push(new Pieces(1, 0, 'black', 'pawn'));  
  pieces.push(new Pieces(6, 0, 'white', 'pawn')); 

  currentTurn = 'white'; 
}



function keyPressed() {
  if (key === 'D' || key === 'd') {
    simulateCheckmate(); 
  }
  if (key === 'P' || key === 'p') {
    pawnpro(); 
  }
  if (key === 'S' || key === 's') {
    setupStalemateTest(); 
  }
  

}
