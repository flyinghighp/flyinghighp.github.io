// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

let aiThinking = false;
let gameState = 'menu';  
let startBtn;
let ovoBtn;
let resignBtn;
let bgMusic;
let isMuted = false;
let infoIcon;
let controlIcon;
let playagainIcon;
let loadBtn;
let saveBtn;
let pieceTooltip;
let tooltip; 
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
let currentTurn = 'White';
let gameOver = false;
let winner = null;
let WhiteWinImg, BlackWinImg, stalemateImg;
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
  woodTexture = loadImage('assets/woodtexture.jpg');
  WhiteWinImg = loadImage("assets/WhiteWins.png");
  BlackWinImg = loadImage("assets/BlackWins.png");
  stalemateImg = loadImage("assets/stalemate.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  cam = createCamera();
  cam.setPosition(0, 100, 900);
  cam.lookAt(0, 0, 0);
  angleMode(DEGREES);
  
  startBtn = createButton('Play Vs AI');
  startBtn.addClass('start-ui');
  startBtn.mousePressed(() => {
    gameState = 'play';
    startBtn.hide();
    ovoBtn.hide();
    resignBtn.show();
    controlIcon.hide();
    playagainIcon.hide();
    loadBtn.show();
    saveBtn.show();
    document.getElementById("gifBackground").style.display = "none";
    document.getElementById("gameTitle").style.display = "none";
  });


  saveBtn = createImg('assets/save.png', 'Save Game');
  saveBtn.id('saveIcon');
  saveBtn.parent(document.body); 
  saveBtn.mousePressed(saveGameState);
  saveBtn.hide();

  loadBtn = createImg('assets/load.png', 'Load Saved Game');
  loadBtn.id('loadIcon');
  loadBtn.parent(document.body); 
  loadBtn.mousePressed(loadGameState);
  loadBtn.hide();

  ovoBtn = createButton('1 V 1');
  ovoBtn.addClass('start-ui');
  ovoBtn.position(width/2, height/2-100); 
  ovoBtn.mousePressed(() => {
    gameState = 'ovo';
    startBtn.hide();
    resignBtn.show();
    ovoBtn.hide();
    controlIcon.hide();
    playagainIcon.hide();
    loadBtn.show();
    saveBtn.show();
    document.getElementById("gifBackground").style.display = "none";
    document.getElementById("gameTitle").style.display = "none";
  });

  size = min(width, height) / 10;
  chessBoard = new ChessBoard();
  chessBoard.createBoard(0, 0);

  infoIcon = createImg('assets/info.png', 'Info');
  infoIcon.id('infoIcon'); 
  infoIcon.parent(document.body); 
  infoIcon.mousePressed(() => {
    window.open('https://www.chess.com/learn-how-to-play-chess', '_blank');
  });

  controlIcon = createImg('assets/gameController.png', 'Controls');
  controlIcon.id('controlIcon');  
  controlIcon.parent(document.body); 
  controlIcon.mousePressed(() => {
    window.open('Controls.html', '_blank');
    playagainIcon.hide(); 
    loadBtn.hide();
    saveBtn.hide();
  });
  playagainIcon = createImg('assets/restartButton.jpg', 'Play Again');
  playagainIcon.id('playagainIcon');  
  playagainIcon.parent(document.body); 
  playagainIcon.mousePressed(() => {
    window.open('index.html', '_blank');
  });
  playagainIcon.hide();

  const audioIcon = document.getElementById("audioIcon");
  bgMusic.setVolume(0);

  audioIcon.addEventListener("click", () => {
    isMuted = !isMuted;

    if (isMuted) {
      bgMusic.setVolume(0);
      bgMusic.stop(); 
      audioIcon.src = "assets/pause.png"; 
    }
    else {
      bgMusic.setVolume(1); 
      bgMusic.loop();
      audioIcon.src = "assets/unpause.png"; 
    }
  });
  
  resignBtn = createImg('assets/resign.png', 'RESIGN');
  resignBtn.position(width/2+110, 9);
  resignBtn.id('resignIcon');
  resignBtn.parent(document.body); 
  resignBtn.mousePressed(() => {
    gameOver = true;
    winner = 'White';
  });
  resignBtn.hide();

  //WHITE
  pieces.push(new Pieces(0, 0, 'White', 'Rook'));
  pieces.push(new Pieces(0, 1, 'White', 'Knight'));
  pieces.push(new Pieces(0, 2, 'White', 'Bishop'));
  pieces.push(new Pieces(0, 3, 'White', 'Queen'));
  pieces.push(new Pieces(0, 4, 'White', 'King'));
  pieces.push(new Pieces(0, 5, 'White', 'Bishop'));
  pieces.push(new Pieces(0, 6, 'White', 'Knight'));
  pieces.push(new Pieces(0, 7, 'White', 'Rook'));

  pieces.push(new Pieces(1, 0, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 1, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 2, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 3, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 4, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 5, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 6, 'White', 'Pawn'));
  pieces.push(new Pieces(1, 7, 'White', 'Pawn'));

  // BLACK//
  pieces.push(new Pieces(6, 0, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 1, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 2, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 3, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 4, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 5, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 6, 'Black', 'Pawn'));
  pieces.push(new Pieces(6, 7, 'Black', 'Pawn'));

  pieces.push(new Pieces(7, 0, 'Black', 'Rook'));
  pieces.push(new Pieces(7, 1, 'Black', 'Knight'));
  pieces.push(new Pieces(7, 2, 'Black', 'Bishop'));
  pieces.push(new Pieces(7, 3, 'Black', 'Queen'));
  pieces.push(new Pieces(7, 4, 'Black', 'King'));
  pieces.push(new Pieces(7, 5, 'Black', 'Bishop'));
  pieces.push(new Pieces(7, 6, 'Black', 'Knight'));
  pieces.push(new Pieces(7, 7, 'Black', 'Rook'));

  pieceTooltip = createDiv('');
  pieceTooltip.id('pieceTooltip');
  pieceTooltip.html('');

  tooltip = document.getElementById('pieceTooltip');

}

function draw() {

  if (gameState === 'menu') {
    
    background(30);
    return; 
  }
  
  if(!gameOver){
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

    let found = false;

    for (let p of pieces) {
      let pos = getBoardPosition(p.col, p.row);
      let d = dist(worldX, worldY, pos.x, pos.y);

      if (d < size * 0.5) {
        pieceTooltip.html(p.color + ' ' + p.piece);
        pieceTooltip.position(mouseX + 10, mouseY + 10);
        pieceTooltip.style('display', 'block');
        found = true;
        break;
      }
    }

    if (!found) {
      pieceTooltip.style('display', 'none');
    }

    
    // Calculate grid position for X and Y

    if (worldX >= -size * 4 && worldX <= size * 4 &&
    worldY >= -size * 4 && worldY <= size * 4) {

      hoveredX = Math.floor((worldY + size * 4) / size);
      hoveredY = Math.floor((worldX + size * 4) / size);
    }
    chessBoard.makeSide();

    chessBoard.drawBoard(0, 0, hoveredX, hoveredY);
  }
  
  if (!gameOver && gameState === 'play') {
    
    updateScoreDisplay();

    const opp = currentTurn === 'White' ? 'Black' : 'White';
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
    }
    
    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
    }

    if (currentTurn === 'White' && !aiThinking) {
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

    const opp = currentTurn === 'White' ? 'Black' : 'White';
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
      playagainIcon.show();
    }
    
    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
      playagainIcon.show();
    }

    if (gameOver) {
      cam.setPosition(0, 0, 500);
      cam.lookAt(0, 0, 0);
      imageMode(CENTER);
      resignBtn.hide();
      controlIcon.hide();
      infoIcon.hide();
      playagainIcon.show();

      if (winner === 'White') {
        image(WhiteWinImg, 0, 0, windowWidth, windowHeight); 
      }

      else if (winner === 'Black') {
        image(BlackWinImg, 0, 0, windowWidth, windowHeight);
      }
      else  {
        image(stalemateImg, 0, 0, windowWidth/2, windowHeight*0.5+100);
      }
    
    }
  }

  if (gameOver) {
    cam.setPosition(0, 0, 500);
    cam.lookAt(0, 0, 0);
    imageMode(CENTER);
    resignBtn.hide();
    controlIcon.hide();
    infoIcon.hide();
    playagainIcon.show();

    if (winner === 'White') {
      image(WhiteWinImg, 0, 0, windowWidth, windowHeight); 
    }

    if (winner === 'Black') {
      image(BlackWinImg, 0, 0, windowWidth, windowHeight);
    }
    if  (winner ==='draw'){
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
    Pawn: 1,
    Knight: 3,
    Bishop: 3,
    Rook: 5,
    Queen: 9
  };

  const initialCounts = {
    White: { Pawn: 8, Knight: 2, Bishop: 2, Rook: 2, Queen: 1 },
    Black: { Pawn: 8, Knight: 2, Bishop: 2, Rook: 2, Queen: 1 }
  };

  for (let p of pieces) {
    if (p.piece in pieceValues) {
      initialCounts[p.color][p.piece]--;
    }
  }

  let WhiteScore = 0;
  let BlackScore = 0;

  for (let piece in pieceValues) {
    WhiteScore += initialCounts.Black[piece] * pieceValues[piece];
    BlackScore += initialCounts.White[piece] * pieceValues[piece];
  }

  scoreDiv.innerText = `White: ${WhiteScore} | Black: ${BlackScore}`;
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
    case 'White':
      fill(215, 210, 225);
      specularMaterial(215, 210, 225); break;
    case 'Black':
      fill(139, 69, 19);
      specularMaterial(139, 69, 19); break;
    }
    
    switch (this.piece) {
    case 'Bishop':
      if (this.color === 'White') {
        model(biW);
      }
      else {
        model(biB);
      }
      break;

    case 'Pawn':
      if (this.color === 'White') {
        model(wp);
      }
      else {
        model(bp);
      }
      break;

    case 'Rook':
      if (this.color === 'White') {
        model(wr);
      }
      else {
        model(br);
      }
      break;

    case 'Knight':
      if (this.color === 'White') {
        model(wkni);
      }
      else {
        model(bkni);
      }
      break;

    case 'King':
      if (this.color === 'White') {
        model(wk);
      }
      else {
        model(bk);
      }
      break;

    case 'Queen':
      if (this.color === 'White') {
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
  if (target && target.piece === 'King') {
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
  case 'Pawn':
    const dir = selectedPiece.color === 'White' ? 1 : -1;
    const startCol = selectedPiece.color === 'White' ? 1 : 6;
      
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
    
  case 'Rook':
    if (dr === 0 || dc === 0) {
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'Bishop':
    if (Math.abs(dr) === Math.abs(dc)) {
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'Queen':
    if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'King':
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

    

  case 'Knight':
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
  // Cannot capture own pieces or own King
  if (target && target.piece === 'King' && target.color === currPiece.color) {
    return false;
  }
  if (target && target.color === currPiece.color) {
    return false;
  }

  const dr = newCol - currPiece.col;  // ****Flip column and row logic (unchanged)
  const dc = newRow - currPiece.row;  // ****Flip column and row logic (unchanged)

  switch (currPiece.piece) {
  case 'Pawn':
    const dir = currPiece.color === 'White' ? 1 : -1;
    const startCol = currPiece.color === 'White' ? 1 : 6;
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

  case 'Rook':
    if (dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'Bishop':
    if (Math.abs(dr) === Math.abs(dc)) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'Queen':
    if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'King':
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

  case 'Knight':
    return Math.abs(dr) === 2 && Math.abs(dc) === 1 ||
             Math.abs(dr) === 1 && Math.abs(dc) === 2;
  }
}

function isInCheck(color) {
  // Find the King 
  const King = pieces.find(p => p.piece === 'King' && p.color === color);
  if (!King) {
    return false;
  } 
  // Check if any enemy piece can move to the King's position
  for (let p of pieces) {
    if (p.color !== color) {
      if (legalMove2(p,King.row, King.col)) {
        return true; 
      }
    }
  }

  return false; // No enemy piece can attack the King
}

function isCheckmate(color) {
  // If King is not in check, it's not checkmate
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
          } // Restore captured draw

          if (!inCheck) {
            selectedPiece = null;
            return false;
          }
        }

        selectedPiece = null; 
      }
    }
  }

  return true; // Tried all moves, none save the King -> checkmate
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
            return false; // Found at least one legal move that doesn't leave King in check
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

      // Handle Pawn promotion
      if (selectedPiece.piece === 'Pawn' &&
         (selectedPiece.col === 0 || selectedPiece.col === 7)) {
        PawnPromotion();
      }
      else {
        const opponentColor = currentTurn === 'White' ? 'Black' : 'White';

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
          if (gameState === 'play' && currentTurn === 'White') {
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
 
function PawnPromotion() {
  
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
      const opponentColor = currentTurn === 'White' ? 'Black' : 'White';
      if (isCheckmate(opponentColor)) {
        gameOver = true;
        winner = currentTurn;
      }
      if (isStalemate) {
        gameOver = true;
        winner = 'draw';
      }
      else {
        currentTurn = opponentColor;
      }

      selectedPiece = null; 
    }

    q.mousePressed(() => promoteTo("Queen"));
    r.mousePressed(() => promoteTo("Rook"));
    b.mousePressed(() => promoteTo("Bishop"));
    k.mousePressed(() => promoteTo("Knight"));
  }
}

function saveGameState(){
  if(!gameOver){
    const currState = {
      pieces : pieces.map(p => ({
        row: p.row,
        col: p.col,
        color: p.color,
        piece: p.piece
      })),
      currentTurn,
    
      gameState
    };
    localStorage.setItem("savedChessGame",JSON.stringify(currState));
    alert("Game Saved");
  }
}

function loadGameState() {
  if (!gameOver) {
    const data = localStorage.getItem("savedChessGame");
    if (!data) {
      alert("No Saved Game Found.");
      return;
    }

    const currState = JSON.parse(data);
    pieces = currState.pieces.map(p => new Pieces(p.col, p.row, p.color, p.piece));
    currentTurn = currState.currentTurn;
    gameState = currState.gameState;

    winner = null;
    selectedPiece = null;
    dragging = false;
    aiThinking = false;
    promotionPiece = null;
    promotionButtons = [];
    promotionInProgress = false;

    alert("Game Loaded.");

    // Delay AI move to prevent false stalemate or checkmate
    setTimeout(() => {
      if (!gameOver && gameState === 'play' && currentTurn === 'White') {
        aiThinking = true;
        setTimeout(() => {
          aiMoveWhite();
          aiThinking = false;
        }, 100);
      }
    }, 200);
  }
}

//---------------//
//    TESTING    //
//---------------//

function simulateCheckmate() {
  pieces = []; 
  gameState = 'testing'; 

  // White pieces
  pieces.push(new Pieces(1, 3, 'White', 'Rook'));  
  pieces.push(new Pieces(2, 0, 'White', 'King'));  

  // Black pieces
  pieces.push(new Pieces(0, 0, 'Black', 'King'));  
  pieces.push(new Pieces(6, 7, 'Black', 'Pawn'));  

  currentTurn = 'White'; 
}

function setupStalemateTest() {
  pieces = [];
  gameState = 'testing'; 

  pieces.push(new Pieces( 1, 5, 'White', 'King'));

  pieces.push(new Pieces( 2, 6, 'White','Queen'));

  pieces.push(new Pieces( 0, 7, 'Black','King'));
  currentTurn = 'Black'; 
  
  console.log("Stalemate for Black?", isStalemate('Black'));
}

function Pawnpro() {
  pieces = []; 
  gameState = 'testing'; 
  // White pieces
  pieces.push(new Pieces(1, 0, 'Black', 'Pawn'));  
  pieces.push(new Pieces(6, 0, 'White', 'Pawn')); 

  currentTurn = 'White'; 
}

function keyPressed() {
  if (key === 'D' || key === 'd') {
    simulateCheckmate(); 
  }
  if (key === 'P' || key === 'p') {
    Pawnpro(); 
  }
  if (key === 'S' || key === 's') {
    setupStalemateTest(); 
  }
  
}

