/* 
=====================================================================================
  CHESS.INC - FINAL PROJECT
  Made by: Priyansh Jhanji
  Date: April 25, 2025 - June 15, 2025
=====================================================================================
⚠️ Copyright © — Tag me if you’d like to use it!
ABOUT:
This is a 3D chess game made with p5.js and WEBGL. 
You can play against the computer or with a friend on the same screen.
It uses real chess rules, drag-and-drop to move pieces, and has music and sound effects.

FEATURES:
- 3D chess pieces and board
- Play vs AI or 1v1 mode
- Real chess rules (including pawn promotion)
- Win, draw, and stalemate detection
- Music and sound for moves and game ending
- Save and load your game
- Hover over pieces to see what they are

HOW IT WORKS:
- Click “Play Vs AI” to play the computer
- Click “1 V 1” to play with a friend
- Use “Save” to save the game, and “Load” to continue it later
*/

//comment: Nice game it does not really have any errors
//comment: brilliant game, intuitive menu and responsive game, it could use
// an overlay for where the chess piece can go so we know what moves are possible
// for new players of chess
//comment: cool design, but some images look wierd
//comment: I like the game mechanics, very complete
//comment:works very well, ai was a little to easy to beat imo, but game functions very well, would have liked to test if en passant works.

// --- GLOBAL VARIABLES --- //

// --- GAME STATE / AI WORKING / CURRENT TURN --- //
let aiThinking = false;
let gameState = 'menu'; 
let currentTurn = 'White'; 

// --- MUSIC --- //
let bgMusic;
let winMusic;
let looseMusic;
let isMuted = false;
let musicPlayed = false;
let moveMusic;

// --- UI ELEMENTS --- //
let infoIcon;
let rateIcon;
let controlIcon;
let playagainIcon;
let loadBtn;
let saveBtn;
let pieceTooltip;
let startBtn;
let ovoBtn;
let resignBtn;

// --- BOARD & CAMERA --- //
let thickness = 30;
let size;
let cam;
let chessBoard;
let woodTexture;

// --- BOARD DATA --- //
let boardData = [];
let row; 
let col;
let wc;
let bc;
let pieces = [];
let selectedPiece = null;
let dragging = false;
let gameOver = false;
let winner = null;

// --- GAME IMAGES --- //
let startGif;
let whitewinImg; 
let blackwinImg; 
let stalemateImg; 
let drawImg; 

// --- PROMOTION SYSTEM --- //
let promotionPending = false;
let promotionPiece = null;
let promotionButtons = [];
let promotionInProgress = false;

// --- PIECE MODELS --- //
let biB; 
let bk; 
let qb; 
let br; 
let bp; 
let bkni;
let biW; 
let wk; 
let qw; 
let wr; 
let wp; 
let wkni;

// --- PRE-LOAD --- //
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
  moveMusic = loadSound('assets/pieceMovement.mp3');
  winMusic = loadSound('assets/win.mp3');
  looseMusic = loadSound('assets/loosing.mp3');
  woodTexture = loadImage('assets/woodtexture.jpg');
  whitewinImg = loadImage("assets/whiteWins.png");
  blackwinImg = loadImage("assets/blackWins.png");
  stalemateImg = loadImage("assets/stalemate.png");
  drawImg = loadImage("assets/drawByInsufficient.png");
}

// --- SETUP --- //
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create 3D canvas
  cam = createCamera(); // Initialize camera
  cam.setPosition(0, 100, 900); // Set camera position
  cam.lookAt(0, 0, 0); // Point camera at board center
  angleMode(DEGREES); // Degrees for angles
  moveMusic.setVolume(0); // Mute move sound initially
  
  // --- START BUTTON (Play vs AI) --- //
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

  // --- SAVE BUTTON --- //
  saveBtn = createImg('assets/save.png', 'Save Game');
  saveBtn.id('saveIcon');
  saveBtn.parent(document.body); 
  saveBtn.mousePressed(saveGameState);
  saveBtn.hide();

  // --- LOAD BUTTON --- //
  loadBtn = createImg('assets/load.png', 'Load Saved Game');
  loadBtn.id('loadIcon');
  loadBtn.parent(document.body); 
  loadBtn.mousePressed(loadGameState);
  loadBtn.hide();

  // --- OVO BUTTON (1v1 Mode) --- //
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

  // --- BOARD SETUP --- //
  size = min(width, height) / 10;
  chessBoard = new ChessBoard();
  chessBoard.createBoard(0, 0);

  // --- INFO BUTTON --- //
  infoIcon = createImg('assets/info.png', 'Info');
  infoIcon.id('infoIcon'); 
  infoIcon.parent(document.body); 
  infoIcon.mousePressed(() => {
    window.open('https://www.chess.com/learn-how-to-play-chess', '_blank');
  });
  
  // --- RATE BUTTON --- //
  rateIcon = createImg('assets/rate.png', 'Rate Us');
  rateIcon .id('rateIcon'); 
  rateIcon .parent(document.body); 
  rateIcon .mousePressed(() => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfRJqt8zKW7OMAiGnkq3tOfjLE8AjwI1uILa4hfbckj_6QNlA/viewform?usp=header', '_blank');
  });

  // --- CONTROLS BUTTON --- //
  controlIcon = createImg('assets/gameController.png', 'Controls');
  controlIcon.id('controlIcon');  
  controlIcon.parent(document.body); 
  controlIcon.mousePressed(() => {
    window.open('Controls.html', '_blank');
    playagainIcon.hide(); 
    loadBtn.hide();
    saveBtn.hide();
  });

  // --- PLAY AGAIN BUTTON --- //
  playagainIcon = createImg('assets/restartButton.jpg', 'Play Again');
  playagainIcon.id('playagainIcon');  
  playagainIcon.parent(document.body); 
  playagainIcon.mousePressed(() => {
    location.reload();
    musicPlayed = false;
    winMusic.stop();
    looseMusic.stop();
    bgMusic.stop();
  });
  playagainIcon.hide();

  // --- AUDIO TOGGLE BUTTON --- //
  audioIcon = createImg("assets/pause.png", "Audio Toggle");
  audioIcon.id("audioIcon");
  audioIcon.parent(document.body);

  bgMusic.setVolume(1);   
  winMusic.setVolume(0);
  looseMusic.setVolume(0);

  audioIcon.mousePressed(() => {
    isMuted = !isMuted;
    if (isMuted) {
      bgMusic.setVolume(0);
      bgMusic.stop();
      winMusic.stop();
      looseMusic.stop();
      audioIcon.attribute("src", "assets/pause.png");  
    }
    else {
      bgMusic.setVolume(1);
      bgMusic.loop();
      audioIcon.attribute("src", "assets/unpause.png"); 
    }
  });

  // --- RESIGN BUTTON --- //
  resignBtn = createImg('assets/resign.png', 'RESIGN');
  resignBtn.position(width/2+110, 9);
  resignBtn.id('resignIcon');
  resignBtn.parent(document.body); 
  resignBtn.mousePressed(() => {
    gameOver = true;
    winner = 'White';
  });
  resignBtn.hide();

  // --- WHITE PIECES --- //
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

  // --- BLACK PIECES --- //
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

  // --- TOOLTIP --- //
  pieceTooltip = createDiv('');
  pieceTooltip.id('pieceTooltip');
  pieceTooltip.html('');
}

// Main rendering loop (runs every frame)
// Handles game state updates, board drawing, piece interaction, 
// AI moves, and game-over logic for both AI and 1v1 modes.
function draw() {

  // --- MENU SCREEN --- //
  if (gameState === 'menu') {
    background(30);  // Dark background for the main menu
    return;          // Exit draw loop early in menu mode
  }

  // --- MAIN GAME RENDER --- //
  if (!gameOver) {
    background(0);  // Clear screen with black background

    // Add lighting to scene for 3D effect
    ambientLight(255);
    directionalLight(255, 255, 255, 0, 1, -1);

    // Calculate mouse position in 3D world space
    let worldX = mouseX - width / 2;
    let worldY = mouseY - height / 2;

    // Draw all chess pieces
    for (let p of pieces) {
      p.display();
    }

    // --- HOVER TOOLTIP LOGIC --- //
    let hoveredX = 1;  // Default hovered grid position
    let hoveredY = 1;
    let found = false;

    for (let p of pieces) {
      let pos = getBoardPosition(p.col, p.row);
      let d = dist(worldX, worldY, pos.x, pos.y);

      if (d < size * 0.5) {
        pieceTooltip.html(p.color + ' ' + p.piece); // Show color and piece type
        pieceTooltip.position(mouseX + 10, mouseY + 10);
        pieceTooltip.style('display', 'block');
        found = true;
        break;
      }
    }

    if (!found) {
      pieceTooltip.style('display', 'none');  // Hide tooltip if no piece is hovered
    }

    // --- HIGHLIGHTING HOVERED SQUARE --- //
    if (worldX >= -size * 4 && worldX <= size * 4 &&
        worldY >= -size * 4 && worldY <= size * 4) {
      hoveredX = Math.floor((worldY + size * 4) / size);
      hoveredY = Math.floor((worldX + size * 4) / size);
    }

    // Draw board frame and square highlights
    chessBoard.makeSide();
    chessBoard.drawBoard(0, 0, hoveredX, hoveredY);
  }

  // --- AI GAME MODE (White AI) --- // 
  if (!gameOver && gameState === 'play') {

    updateScoreDisplay();  // Show score for both sides

    const opp = currentTurn === 'White' ? 'Black' : 'White';

    // Check for game-ending conditions
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
    }

    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
    }

    if (isDraw(opp)) {
      gameOver = true;
      winner = 'byInsufficient';
    }

    // Make AI move if it's White's turn
    if (currentTurn === 'White' && !aiThinking) {
      aiThinking = true;
      setTimeout(() => {
        aiMoveWhite();
        aiThinking = false;
      }, 100);  // Delay for more natural AI thinking
    }
  }

  // --- PLAYER VS PLAYER MODE (1v1) --- // 
  if (!gameOver && gameState === 'ovo') {
    updateScoreDisplay();  // Update piece scores
    resignBtn.hide();      // No resign option in 1v1

    const opp = currentTurn === 'White' ? 'Black' : 'White';

    // Game-end condition checks
    if (isCheckmate(opp)) {
      gameOver = true;
      winner = currentTurn;
    }

    if (isStalemate(opp)) {
      gameOver = true;
      winner = 'draw';
    }

    if (isDraw(opp)) {
      gameOver = true;
      winner = 'byInsufficient';
    }
  }

  // --- END OF GAME SCREEN --- //
  if (gameOver) {
    cam.setPosition(0, 0, 500);  // Reset camera view
    cam.lookAt(0, 0, 0);
    imageMode(CENTER);          // Center the image

    // Hide UI buttons during end screen
    resignBtn.hide();
    controlIcon.hide();
    infoIcon.hide();
    playagainIcon.show();  // Show "Play Again" button
    loadBtn.hide();
    saveBtn.hide();
    pieceTooltip.hide();
    audioIcon.hide();

    // --- PLAY ENDING MUSIC --- //
    if (!musicPlayed && !isMuted) {
      bgMusic.stop();  // Stop background music

      // Choose winning sound based the type of win and game state
      if (winner === 'White' && gameState === 'play') {
        looseMusic.setVolume(1);
        looseMusic.play();
        looseMusic.loop();
      }
      else if (winner === 'Black' && gameState === 'play') {
        winMusic.setVolume(1);
        winMusic.play();
        winMusic.loop();
      }
      else if (gameState === 'play' && winner === 'draw') {
        winMusic.setVolume(1);
        winMusic.play();
        winMusic.loop();
      }
      else if (gameState === 'play' && winner === 'byInsufficient') {
        winMusic.setVolume(1);
        winMusic.play();
        winMusic.loop();
      }
      else if (gameState === 'ovo') {
        winMusic.setVolume(1);
        winMusic.play();
        winMusic.loop();
      }

      musicPlayed = true;
    }

    // --- SHOW WINNER IMAGE --- // 
    if (winner === 'White') {
      image(whitewinImg, 0, 0, windowWidth, windowHeight);
    }

    if (winner === 'Black') {
      image(blackwinImg, 0, 0, windowWidth, windowHeight);
    }

    if (winner === 'byInsufficient') {
      imageMode(CENTER);
      image(drawImg, 0, 0, windowWidth, windowHeight * 0.85); 
    }

    if (winner === 'draw')  {
      image(stalemateImg, 0, 0, windowWidth / 2, windowHeight * 0.5 + 100);
    }
  }
}

// --- Converts chessboard grid (row, col) into world space X, Y, Z --- // 
function getBoardPosition(row, col, z = 60) {
  const x = -size * 4 + col * size + size / 2;
  const y = -size * 4 + row * size + size / 2;
  return { x, y, z };
}

// --- Calculates material score and updates score display --- //
function updateScoreDisplay() {
  const scoreDiv = document.getElementById("scoreDisplay");

  // Hide score if not in game mode
  if (gameState !== 'play' && gameState !== 'ovo') {
    scoreDiv.style.display = "none";
    return;
  }
  else {
    scoreDiv.style.display = "block";
  }

  // Point values for each piece
  const pieceValues = {
    Pawn: 1,
    Knight: 3,
    Bishop: 3,
    Rook: 5,
    Queen: 9
  };

  // Initial count of each piece per side
  const initialCounts = {
    White: { Pawn: 8, Knight: 2, Bishop: 2, Rook: 2, Queen: 1 },
    Black: { Pawn: 8, Knight: 2, Bishop: 2, Rook: 2, Queen: 1 }
  };

  // Subtract captured pieces from the count
  for (let p of pieces) {
    if (p.piece in pieceValues) {
      initialCounts[p.color][p.piece]--;
    }
  }

  // --- Compute total score by value of captured pieces --- //
  let WhiteScore = 0;
  let BlackScore = 0;

  for (let piece in pieceValues) {
    WhiteScore += initialCounts.Black[piece] * pieceValues[piece];
    BlackScore += initialCounts.White[piece] * pieceValues[piece];
  }

  // Update the score display
  scoreDiv.innerText = `White: ${WhiteScore} | Black: ${BlackScore}`;
}

//-----------------------------//
//  Chess Piece Object Class   //
//-----------------------------//
// This class defines each chess piece's data and how it's displayed.
// It stores the row, column, color, and type of piece, and also handles 3D drawing.
class Pieces {
  constructor(col, row, color, piece) {
    this.row = row; // The row position of the piece on the board (0–7)
    this.col = col; // The column position of the piece on the board (0–7)
    this.color = color; // The color of the piece ('White' or 'Black')
    this.piece = piece; // The type of piece ('Pawn', 'King', etc.)

  }

  display() {
    push();
    let x, y, z = 60;
    if (this === selectedPiece && dragging) {
      // If this is the selected piece and the user is dragging it, follow the mouse
      x = mouseX - width / 2;
      y = mouseY - height / 2;
    }
    else {
      // Otherwise, place it based on its board position
      let pos = getBoardPosition(this.col, this.row);
      x = pos.x;
      y = pos.y;
    }

    translate(x, y, z); // Move the 3D model to its correct spot on the board
    rotate(130); // Apply rotations to orient the model correctly in 3D
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(202);

    stroke(110); // Outline color
    scale(0.45); // Shrink the model to fit the board space
    strokeWeight(0.8); // Set the stroke thickness

    switch (this.color) {
    case 'White':
      fill(215, 210, 225); // Light material color for white pieces
      specularMaterial(215, 210, 225); // Makes it reflect light
      break;
    case 'Black':
      fill(139, 69, 19); // Brownish color for black pieces
      specularMaterial(139, 69, 19);
      break;
    }
    
    // Draw the correct 3D model for this piece
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

// This function checks if there is a piece at the given row and col
function pieceAt(row, col) {
  return pieces.find(p => p.row === row && p.col === col);
}

// Checks if the path between a starting and ending square is clear (no blocking pieces)
function isPathClear(startRow, startCol, endRow, endCol) {
  let rowStep = Math.sign(endRow - startRow);
  let colStep = Math.sign(endCol - startCol);

  let row = startRow + rowStep;
  let col = startCol + colStep;

  while (row !== endRow || col !== endCol) {
    if (pieces.some(p => p.row === row && p.col === col)) {
      return false;   // A piece is blocking the path
    }
    row += rowStep;
    col += colStep;
  }

  return true; // Path is clear
}

// Handles what happens when the mouse is clicked
function mousePressed() {

  if (gameState === 'menu') { 
    return; // If game state = menue then return false
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

// Determines if the selected piece can legally move to the new square
function legalMove(newRow, newCol) {
 
  // If no piece is selected or it's not the current player's turn, move is illegal
  if (!selectedPiece || selectedPiece.color !== currentTurn) {
    return false;
  }

  // If new position is outside the 8x8 board, move is illegal
  if (!(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)) {
    return false;
  }

  // Find if any piece occupies the target square
  const target = pieces.find(p => p.col === newCol && p.row === newRow);

  // Cannot move to a square occupied by a King (special rule here)
  if (target && target.piece === 'King') {
    return false;
  } 

  // Cannot move to a square occupied by a friendly piece
  if (target && target.color === selectedPiece.color) {
    return false;
  }

  // Calculate horizontal and vertical distance moved
  const dr = newCol - selectedPiece.col;  
  const dc = newRow - selectedPiece.row; 
 
  // Check moves depending on piece type
  switch (selectedPiece.piece) {
  case 'Pawn':
    // Direction pawns move in depends on color: White moves "up" (1), Black moves "down" (-1)
    const dir = selectedPiece.color === 'White' ? 1 : -1;
    // Starting row for pawns to move 2 squares
    const startCol = selectedPiece.color === 'White' ? 1 : 6;

    // Normal forward move: no column change and no piece in target square
    if (dc === 0 && !target) {
      // Pawn can move 1 square forward or 2 squares if on start row and path is clear
      if (dr === dir || selectedPiece.col === startCol && dr === 2 * dir &&
            !pieces.some(p => p.col === selectedPiece.col + dir && p.row === selectedPiece.row)) {
        return true;
      }
    }
    // Pawn capture: diagonal move by 1 row and 1 column, target piece is enemy
    else if (Math.abs(dc) === 1 && dr === dir && target && target.color !== selectedPiece.color) {
      return true;
    }
    // All other pawn moves illegal
    return false;

  case 'Rook':
    // Rook moves in straight lines: either column or row must stay the same
    if (dr === 0 || dc === 0) {
      // Check if path between start and end is clear (no pieces blocking)
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'Bishop':
    // Bishop moves diagonally: absolute column and row distance must be equal
    if (Math.abs(dr) === Math.abs(dc)) {
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'Queen':
    // Queen moves like Rook or Bishop: straight or diagonal
    if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
      return isPathClear(selectedPiece.row, selectedPiece.col, newRow, newCol);
    }
    return false;

  case 'King':
    // King moves exactly one square in any direction
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

  case 'Knight':
    // Knight moves in L-shape: 2 squares one direction, 1 square perpendicular
    return Math.abs(dr) === 2 && Math.abs(dc) === 1 || Math.abs(dr) === 1 && Math.abs(dc) === 2;
  }
}

// Same as legalMove but works for any given piece (used by AI and other functions)
function legalMove2(currPiece, newRow, newCol) {
  // If piece does not exist, move is illegal
  if (!currPiece) {
    return false;
  }
  // Position must be inside the board
  if (!(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)) {
    return false;
  }

  // Check if target square is occupied
  const target = pieces.find(p => p.col === newCol && p.row === newRow);

  // Cannot capture own King or own piece
  if (target && target.piece === 'King' && target.color === currPiece.color) {
    return false;
  }
  if (target && target.color === currPiece.color) {
    return false;
  }

  // Calculate horizontal and vertical distances moved
  const dr = newCol - currPiece.col;  
  const dc = newRow - currPiece.row;  

  // Validate move by piece type
  switch (currPiece.piece) {
  case 'Pawn':
    // Direction of movement based on color
    const dir = currPiece.color === 'White' ? 1 : -1;
    // Starting row to allow two-square move
    const startCol = currPiece.color === 'White' ? 1 : 6;
    // Forward move (no sideways move)
    if (dc === 0 && !target) {
      if (dr === dir || currPiece.col === startCol && dr === 2 * dir &&
            !pieces.some(p => p.col === currPiece.col + dir && p.row === currPiece.row)) {
        return true;
      }
    }
    // Capture move: one diagonal step forward onto enemy piece
    else if (Math.abs(dc) === 1 && dr === dir && target && target.color !== currPiece.color) {
      return true;
    }
    return false;

  case 'Rook':
    // Straight moves only
    if (dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'Bishop':
    // Diagonal moves only
    if (Math.abs(dr) === Math.abs(dc)) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'Queen':
    // Combines rook and bishop moves
    if (Math.abs(dr) === Math.abs(dc) || dr === 0 || dc === 0) {
      return isPathClear(currPiece.row, currPiece.col, newRow, newCol);
    }
    return false;

  case 'King':
    // One square in any direction
    return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;

  case 'Knight':
    // L-shape moves
    return Math.abs(dr) === 2 && Math.abs(dc) === 1 ||
             Math.abs(dr) === 1 && Math.abs(dc) === 2;
  }
}

// Checks if the King of a certain color is currently under threat
function isInCheck(color) {
  // Find the King piece for the given color
  const King = pieces.find(p => p.piece === 'King' && p.color === color);
  if (!King) {
    // If no King found, cannot be in check (should not happen in normal game)
    return false;
  } 
  // Check every enemy piece to see if it can move to King's square
  for (let p of pieces) {
    if (p.color !== color) {
      if (legalMove2(p, King.row, King.col)) {
        // Found an enemy piece that threatens the King
        return true; 
      }
    }
  }

  // No threats found; King is safe
  return false; 
}

function isCheckmate(color) {
  // If the king is not in check, it's not checkmate
  if (!isInCheck(color)) {
    return false;
  }

  // Go through all pieces belonging to the player of this color
  for (let p of pieces) {
    if (p.color !== color) {
      continue; // Skip enemy pieces
    }

    // Try moving the piece to every square on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {

        const originalRow = p.row;        // Save original row
        const originalCol = p.col;        // Save original column
        const captured = pieceAt(r, c);   // Check if there's a piece at destination

        selectedPiece = p; // Temporarily treat this piece as selected

        // Check if this piece can legally move to square (r, c)
        if (legalMove2(p,r, c)) {

          // Make the move temporarily
          p.row = r;
          p.col = c;

          // If a piece was captured, remove it from the board
          if (captured) {
            pieces = pieces.filter(x => x !== captured);
          }

          const inCheck = isInCheck(color); // After the move, check if the King is still in check

          // Undo the move: restore original position
          p.row = originalRow;
          p.col = originalCol;

          // Put captured piece back
          if (captured) {
            pieces.push(captured);
          }

          // If after the move the King is no longer in check, it's not checkmate
          if (!inCheck) {
            selectedPiece = null;
            return false;
          }
        }

        // Deselect the piece after trying this move
        selectedPiece = null;
      }
    }
  }

  return true; // No legal move removed the check → it's checkmate
}

function isStalemate(color) {
  if (isInCheck(color)) {
    return false; // If in check, it's not stalemate
  }

  for (let p of pieces) {
    if (p.color !== color) {
      continue;
    }

    const originalRow = p.row;
    const originalCol = p.col;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const captured = pieceAt(r, c);

        if (legalMove2(p, r, c)) {
          // Simulate move
          p.row = r;
          p.col = c;
          if (captured) {
            pieces = pieces.filter(x => x !== captured);
          }

          const stillInCheck = isInCheck(color); // Is king still safe?

          // Undo move
          p.row = originalRow;
          p.col = originalCol;
          if (captured) {
            pieces.push(captured);
          }

          if (!stillInCheck) {
            return false; // Found one legal move that keeps king safe
          }
        }
      }
    }
  }

  gameOver = true; // Optional workaround
  return true; // No safe legal moves found, and not in check → stalemate
}


function isDraw() {
  // Split white and black pieces
  let whitePieces = pieces.filter(p => p.color === 'White');
  let blackPieces = pieces.filter(p => p.color === 'Black');

  // Count all pieces except kings
  const countMaterial = list => {
    return list.map(p => p.piece).filter(p => p !== 'King');
  };

  let whiteMaterial = countMaterial(whitePieces);
  let blackMaterial = countMaterial(blackPieces);

  // Case 1: King vs King → no way to win → draw
  if (whiteMaterial.length === 0 && blackMaterial.length === 0) {
    return true;
  }

  // Case 2: King + Bishop or Knight vs King → not enough material to force checkmate
  if (
    whiteMaterial.length === 1 && (whiteMaterial[0] === 'Bishop' || whiteMaterial[0] === 'Knight') && blackMaterial.length === 0 ||
    blackMaterial.length === 1 && (blackMaterial[0] === 'Bishop' || blackMaterial[0] === 'Knight') && whiteMaterial.length === 0
  ) {
    return true;
  }

  // Case 3: King + Bishop vs King + Bishop on same color → draw
  if (
    whiteMaterial.length === 1 && whiteMaterial[0] === 'Bishop' &&
    blackMaterial.length === 1 && blackMaterial[0] === 'Bishop'
  ) {
    let whiteBishop = whitePieces.find(p => p.piece === 'Bishop');
    let blackBishop = blackPieces.find(p => p.piece === 'Bishop');

    // Determine the color of square each bishop is on (light/dark)
    let whiteIsLight = (whiteBishop.row + whiteBishop.col) % 2 === 0;
    let blackIsLight = (blackBishop.row + blackBishop.col) % 2 === 0;

    // If both bishops are stuck on same color squares, it's a draw
    if (whiteIsLight === blackIsLight) {
      return true;
    }
  }

  return false; // Otherwise, it's not a draw
}

// Handles what happens when the mouse is released — responsible for dropping the dragged piece and validating the move
function mouseReleased() {
  if (gameOver) {
    return; // Do nothing if the game is already over
  }

  if (dragging && selectedPiece) {
    // Convert mouse position into board coordinates
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;
    let newCol = Math.floor((y + size * 4) / size);
    let newRow = Math.floor((x + size * 4) / size);

    // Keep the move within board boundaries
    newRow = constrain(newRow, 0, 7);
    newCol = constrain(newCol, 0, 7);

    // Try to move to the new position
    if (legalMove(newRow, newCol)) {
      const originalRow = selectedPiece.row;
      const originalCol = selectedPiece.col;
      const captured = pieceAt(newRow, newCol); // Check if we’re capturing

      // Move the piece
      selectedPiece.row = newRow;
      selectedPiece.col = newCol;

      // Play move sound
      moveMusic.setVolume(1);
      moveMusic.play();

      // Handle capture
      if (captured) {
        pieces = pieces.filter(p => p !== captured);
        moveMusic.setVolume(1);
        moveMusic.play();
      }

      // Check if move leaves the king in check — if so, undo
      if (isInCheck(currentTurn)) {
        selectedPiece.row = originalRow;
        selectedPiece.col = originalCol;
        if (captured) {
          pieces.push(captured); // Restore the captured piece
        }
        selectedPiece = null;
        dragging = false;
        return; // Don't allow move into check
      }

      // Handle promotion if pawn reaches last rank
      if (selectedPiece.piece === 'Pawn' &&
         (selectedPiece.col === 0 || selectedPiece.col === 7)) {
        PawnPromotion(); // Trigger UI for promotion
      }
      else {
        const opponentColor = currentTurn === 'White' ? 'Black' : 'White';

        // Checkmate check
        if (isCheckmate(opponentColor)) {
          gameOver = true;
          winner = currentTurn; // Declare winner
        }

        // Stalemate check
        if (isStalemate(opponentColor)) {
          gameOver = true;
          winner = 'draw'; // Declare draw
        }

        if (isDraw(opponentColor)){
          gameOver = true;
          winner = 'byInsufficient';
        }
        else {
          // Otherwise switch turn
          currentTurn = opponentColor;

          // If AI's turn, make AI move
          if (gameState === 'play' && currentTurn === 'White') {
            aiThinking = true;
            setTimeout(() => {
              aiMoveWhite(); // Let AI move
              aiThinking = false;
            }, 10);
          }
        }

        selectedPiece = null; // Deselect piece after move
      }
    }
  }

  dragging = false; // Stop dragging after release
}

// A class to build and draw the 3D chessboard
class ChessBoard {
  constructor() {
    this.board = []; // 2D array to hold square colors
  }

  // Recursively creates board square colors
  createBoard(row, col) {
    if (row >= 8) {
      return; 
    }

    if (!this.board[row]) {
      this.board[row] = [];
    }

    // Define light and dark square colors
    let lightColor = color('#c7c9c8');
    let darkColor = color('#2b1101');

    // Alternate colors based on position
    this.board[row][col] = (row + col) % 2 === 0 ? lightColor : darkColor;

    // Move to next square or next row
    if (col < 7) {
      this.createBoard(row, col + 1);
    }
    else {
      this.createBoard(row + 1, 0);
    }
  }

  // Draws the 3D wooden borders around the board
  makeSide() {
    push();
    noStroke();
    texture(woodTexture);

    // Top side
    translate(0, -size * 3.75 - size / 2, 0);
    box(size * 8 + size, size / 2, thickness);

    // Bottom side
    translate(0, size * 8 + size / 2, 0);
    box(size * 8 + size, size / 2, thickness);

    // Left side
    translate(-(size * 3.75 + size / 2), -size * 3.75 - size / 2, 0);
    rotateZ(90);
    box(size * 8 + size, size / 2, thickness);

    // Right side
    translate(0, -(size * 8 + size / 2), 0);
    box(size * 8 + size, size / 2, thickness);

    pop();
  }

  // Recursively draws each square of the board
  drawBoard(row, col, hoveredX, hoveredY) {
    if (row >= 8) {
      return; 
    }

    push();
    translate(-size * 4 + col * size + size / 2, -size * 4 + row * size + size / 2, 0);

    // Highlight hovered square
    if (row === hoveredX && col === hoveredY) {
      fill(0, 255, 0); // Green if hovered
    }
    else {
      fill(this.board[row][col]); // Normal color
    }

    noStroke();
    box(size, size, thickness); // Draw the square
    pop();

    // Move to next square or row
    if (col < 7) {
      this.drawBoard(row, col + 1, hoveredX, hoveredY);
    }
    else {
      this.drawBoard(row + 1, 0, hoveredX, hoveredY);
    }
  }
}

// Handles pawn promotion when it reaches the opposite end
function PawnPromotion() {
  if (!promotionInProgress) {
    promotionInProgress = true;

    // Create buttons for each promotion option
    let q = createButton("Queen").position(width / 2, 20);
    let r = createButton("Rook").position(width / 2, 50);
    let b = createButton("Bishop").position(width / 2, 80);
    let k = createButton("Knight").position(width / 2, 110);

    // Function to change pawn to selected piece
    function promoteTo(pieceType) {
      selectedPiece.piece = pieceType; // Promote
      promotionInProgress = false;

      q.remove();
      r.remove();
      b.remove();
      k.remove();

      const opponentColor = currentTurn === 'White' ? 'Black' : 'White';

      // After promotion, check if game ends
      if (isCheckmate(opponentColor)) {
        gameOver = true;
        winner = currentTurn;
      }
      else if (isStalemate(opponentColor)) {
        gameOver = true;
        winner = 'draw';
      }
      else if (isDraw(opponentColor)){
        gameOver = true;
        winner = 'byInsufficient';
      }
      else {
        currentTurn = opponentColor; // Continue game
      }

      selectedPiece = null; // Deselect piece
    }

    // Assign button actions
    q.mousePressed(() => promoteTo("Queen"));
    r.mousePressed(() => promoteTo("Rook"));
    b.mousePressed(() => promoteTo("Bishop"));
    k.mousePressed(() => promoteTo("Knight"));
  }
}

// Saves the current game state (pieces, turn, game status) into local storage
function saveGameState() {
  if (!gameOver) { // Only save if the game is not over
    const currState = {
      // Create a shallow copy of each piece with only essential properties
      pieces: pieces.map(p => ({
        row: p.row,
        col: p.col,
        color: p.color,
        piece: p.piece
      })),
      currentTurn, // Save whose turn it is
      gameState    // Save current mode (e.g., 'play')
    };

    // Store the object in localStorage under the key "savedChessGame"
    localStorage.setItem("savedChessGame", JSON.stringify(currState));

    // Notify the player
    alert("Game Saved");
  }
}

// Loads the game state back from localStorage and updates all necessary variables
function loadGameState() {
  if (!gameOver) { // Only load if game is not finished
    const data = localStorage.getItem("savedChessGame"); // Fetch saved data

    // If no saved data is found, notify and exit
    if (!data) {
      alert("No Saved Game Found.");
      return;
    }

    const currState = JSON.parse(data); // Convert JSON back into object

    // Rebuild pieces array using the saved data (we must recreate each object with its class)
    pieces = currState.pieces.map(p => new Pieces(p.col, p.row, p.color, p.piece));
    currentTurn = currState.currentTurn;
    gameState = currState.gameState;

    // Reset various global flags and variables for a clean restart
    winner = null;
    selectedPiece = null;
    dragging = false;
    aiThinking = false;
    promotionPiece = null;
    promotionButtons = [];
    promotionInProgress = false;

    alert("Game Loaded."); // Inform the user

    // Trigger AI move if it's AI's turn to avoid load bugs like instant checkmate
    setTimeout(() => {
      if (!gameOver && gameState === 'play' && currentTurn === 'White') {
        aiThinking = true;
        setTimeout(() => {
          aiMoveWhite();
          aiThinking = false;
        }, 100); // Slight delay to avoid false triggers
      }
    }, 200);
  }

}
