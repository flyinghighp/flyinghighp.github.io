// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

let thickness = 30;
let size;
let cam;
let chessBoard;
let blackBishopModel;
let whiteBishopModel;
let whiteKingModel;
let blackKingModel;
let blackKnightModel;
let whiteKnightModel;
let blackQueenModel;
let whiteQueenModel;
let whiteRookModel;
let blackRookModel;
let woodTexture;
let bishopBlackpiece; 
let bishopWhitepiece;
let kingWhitepiece;
let kingBlackpiece;
let queenBlackpiece;
let queenWhitepiece;
let rookBlackpiece;
let rookWhitepiece;
let pawnBlackpiece;
let pawnWhitepiece;
let knightBlackpiece;
let knightWhitepiece;
let selectedX = null; // Deselect the piece after moving
let selectedY = null;
function preload() {
  blackBishopModel = loadModel('assets/Bishop - Copy.obj', true);
  whiteBishopModel = loadModel('assets/Bishop.obj', true);
  blackKingModel = loadModel('assets/King - Copy.obj', true);
  whiteKingModel = loadModel('assets/King.obj', true);
  whiteKnightModel = loadModel('assets/Knight.obj', true);
  blackKnightModel = loadModel('assets/Knight - Copy.obj', true);
  whiteQueenModel = loadModel('assets/Queen.obj', true);
  blackQueenModel = loadModel('assets/Queen - Copy.obj', true);
  whitePawnModel = loadModel('assets/Pawn.obj', true);
  blackPawnModel = loadModel('assets/Pawn - Copy.obj', true);
  whiteRookModel = loadModel('assets/Rook.obj', true);
  blackRookModel = loadModel('assets/Rook - Copy.obj', true);
  woodTexture = loadImage('assets/woodtexture.jpg',true); 
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

  bishopBlackpiece = new blackBishop(); 
  bishopWhitepiece = new whiteBishop();

  kingWhitepiece = new whiteKing();
  kingBlackpiece = new blackKing();

  queenWhitepiece = new whiteQueen();
  queenBlackpiece = new blackQueen();

  rookBlackpiece = new blackRook(); 
  rookWhitepiece = new whiteRook();

  knightBlackpiece = new blackKnight(); 
  knightWhitepiece = new whiteKnight();

  pawnBlackpiece = new blackPawn();
  pawnWhitepiece = new whitePawn();
}

function draw() {
  background(0);
  ambientLight(255);
  directionalLight(255, 255, 255, 0, 1, -1);


  
  // Convert mouse position to world space (adjusted for center of the board)
  let worldX = mouseX - width / 2;
  let worldY = mouseY - height / 2;

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

  bishopBlackpiece.makeBbone();
  bishopBlackpiece.makeBbtwo();
  bishopWhitepiece.makeBwbone();
  bishopWhitepiece.makeBwbtwo();
  kingWhitepiece.makeKingone();
  kingBlackpiece.makeKingtwo();
  queenWhitepiece.makeQueenone();
  queenBlackpiece.makeQueentwo();
  rookBlackpiece.makeRookbone();
  rookBlackpiece.makeRookbtwo();
  rookWhitepiece.makeRookone();
  rookWhitepiece.makeRooktwo();
  knightBlackpiece.makeKnightbone();
  knightBlackpiece.makeKnightbtwo();
  knightWhitepiece.makeKnightone();
  knightWhitepiece.makeKnighttwo();
  pawnBlackpiece.makeAll();
  pawnWhitepiece.makeAll();

  chessBoard.drawBoard(0, 0, hoveredX, hoveredY);
  chessBoard.drawBoard(selectedX, selectedY);
}



//-------------------//
//     PIECES       //
//-------------------//
class whiteBishop {
  constructor() {}

  makeBwbone() {
    push();
    translate(-size * 4 + 2 * size + size / 2, -size * 4 + 0 * size + size / 2, 76);
    
    scale(0.7); 
    rotate(130); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteBishopModel);
    pop();

  }

  makeBwbtwo() {
    push();
    translate(-size * 4 + 5 * size + size / 2, -size * 4 + 0 * size + size / 2, 76);
    scale(0.7);  
    rotate(130); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteBishopModel);
    pop();
  }
}

class blackBishop {
  constructor() {}

  makeBbone() {
    push();
    translate(-size * 4 + 2 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.7);  
    rotate(130); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackBishopModel);
    pop();
  }

  makeBbtwo() {
    push();
    translate(-size * 4 + 5 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.7); 
    rotate(130); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackBishopModel);
    pop();
  }
}

class whiteKing {
  constructor() {}

  makeKingone() {
    push();
    
    translate(-size * 4 + 3 * size + size / 2, -size * 4 + 0 * size + size / 2, 76); 
    scale(0.7);  
    rotate(50); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteKingModel);
    pop();
  }
}

class blackKing {
  constructor() {}

  makeKingtwo() {
    push();
    
    translate(-size * 4 + 3 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.7);  
    rotate(50); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackKingModel);
    pop();
  }
}

class whiteQueen {
  constructor() {}

  makeQueenone() {
    push();
    
    translate(-size * 4 + 4 * size + size / 2, -size * 4 + 0 * size + size / 2, 76); 
    scale(0.7);  
    rotate(50); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteQueenModel);
    pop();
  }
}

class blackQueen {
  constructor() {}

  makeQueentwo() {
    push();
    
    translate(-size * 4 + 4 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.7);  
    rotate(23); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackQueenModel);
    pop();
  }
}

class whiteRook {
  constructor() {}

  makeRookone() {
    push();
    
    translate(-size * 4 + 0 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
    scale(0.5);  
     
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteRookModel);
    pop();
  }

  makeRooktwo() {
    push();
    
    translate(-size * 4 + 7 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
    scale(0.5);  
    
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteRookModel);
    pop();
  }
}

class blackRook {
  constructor() {}

  makeRookbone() {
    push();
    
    translate(-size * 4 + 0 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
    scale(0.5);   
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackRookModel);
    pop();
  }

  makeRookbtwo() {
    push();
    
    translate(-size * 4 + 7 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
    scale(0.5);  
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackRookModel);
    pop();
  }
}

class blackKnight {
  constructor() {}

  makeKnightbone() {
    push();
    
    translate(-size * 4 + 1 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
    scale(0.5);   
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(180);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackKnightModel);
    pop();
  }

  makeKnightbtwo() {
    push();
    
    translate(-size * 4 + 6 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
    scale(0.5);   
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(180);
    stroke(110);
    strokeWeight(0.8);
    fill(139, 69, 19);         
    specularMaterial(139, 69, 19);
    model(blackKnightModel);
    pop();
  }
}

class whiteKnight {
  constructor() {}

  makeKnightone() {
    push();

    translate(-size * 4 + 1 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
    scale(0.5);  
    rotate(180); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(180);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteKnightModel);
    pop();
  }

  makeKnighttwo() {
    push();
    
    translate(-size * 4 + 6 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
    scale(0.5);  
    rotate(180); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    rotate(180);
    stroke(110);
    strokeWeight(0.8);
    fill(215, 210, 225);        
    specularMaterial(215, 210, 225);
    model(whiteKnightModel);
    pop();
  }
}



class whitePawn {
  constructor() {}
  
  makeAll() {
    for (let i = 0; i < 8; i++) {
      push();
      
      translate(-size * 4 + i * size + size / 2, -size * 3 + size / 2, 50);
      scale(0.5);
      rotateX(-90);
      rotateZ(90);
      rotateY(-90);
      
      stroke(110);
      strokeWeight(0.8);
      fill(215, 210, 225);        
      specularMaterial(215, 210, 225);
      model(whitePawnModel);
      pop();
    }
  }
}
  
class blackPawn {
  constructor() {}
  
  makeAll() {
    for (let i = 0; i < 8; i++) {
      push();
      
      translate(-size * 4 + i * size + size / 2, size * 2 + size / 2, 50);
      scale(0.5);
      rotateX(-90);
      rotateZ(90);
      rotateY(-90);
      
      stroke(110);
      strokeWeight(0.8);
      fill(139, 69, 19);         
      specularMaterial(139, 69, 19);
      model(blackPawnModel);
      pop();
    }
  }
}
  

//-------------------//
//     BOARD      //
//-------------------//
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
//-------------------//
//     PIECE LOGIC   // 
//-------------------//
class Pawn {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'pawn';
  }

  validMoves(board) {
    let moves = [];
    let direction = this.color === 'white' ? -1 : 1; // White moves up, Black moves down
    let startRow = this.color === 'white' ? 6 : 1;

    // Regular move (one step forward)
    if (board[this.row + direction] && board[this.row + direction][this.col] === null) {
      moves.push({ row: this.row + direction, col: this.col });
    }

    // First move (two steps forward)
    if (this.row === startRow && board[this.row + direction * 2] && board[this.row + direction * 2][this.col] === null) {
      moves.push({ row: this.row + direction * 2, col: this.col });
    }

    // Capture diagonally
    if (this.row + direction >= 0 && this.row + direction < 8) {
      if (this.col - 1 >= 0 && board[this.row + direction][this.col - 1] && board[this.row + direction][this.col - 1].color !== this.color) {
        moves.push({ row: this.row + direction, col: this.col - 1 });
      }
      if (this.col + 1 < 8 && board[this.row + direction][this.col + 1] && board[this.row + direction][this.col + 1].color !== this.color) {
        moves.push({ row: this.row + direction, col: this.col + 1 });
      }
    }

    return moves;
  }
}

class Rook {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'rook';
  }

  validMoves(board) {
    let moves = [];
    let directions = [
      { row: 1, col: 0 },  // Down
      { row: -1, col: 0 }, // Up
      { row: 0, col: 1 },  // Right
      { row: 0, col: -1 }, // Left
    ];

    for (let dir of directions) {
      let r = this.row + dir.row;
      let c = this.col + dir.col;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === null) {
          moves.push({ row: r, col: c });
        }
        else if (board[r][c].color !== this.color) {
          moves.push({ row: r, col: c }); // Capture opponent's piece
          break;
        }
        else {
          break; // Blocked by same-colored piece
        }
        r += dir.row;
        c += dir.col;
      }
    }

    return moves;
  }
}

class Knight {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'knight';
  }

  validMoves(board) {
    let moves = [];
    let directions = [
      { row: 2, col: 1 }, { row: 2, col: -1 },
      { row: -2, col: 1 }, { row: -2, col: -1 },
      { row: 1, col: 2 }, { row: 1, col: -2 },
      { row: -1, col: 2 }, { row: -1, col: -2 }
    ];

    for (let dir of directions) {
      let r = this.row + dir.row;
      let c = this.col + dir.col;
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === null || board[r][c].color !== this.color) {
          moves.push({ row: r, col: c });
        }
      }
    }

    return moves;
  }
}

class Bishop {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'bishop';
  }

  validMoves(board) {
    let moves = [];
    let directions = [
      { row: 1, col: 1 },   // Down-Right
      { row: 1, col: -1 },  // Down-Left
      { row: -1, col: 1 },  // Up-Right
      { row: -1, col: -1 }, // Up-Left
    ];

    for (let dir of directions) {
      let r = this.row + dir.row;
      let c = this.col + dir.col;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === null) {
          moves.push({ row: r, col: c });
        }
        else if (board[r][c].color !== this.color) {
          moves.push({ row: r, col: c }); // Capture opponent's piece
          break;
        }
        else {
          break; // Blocked by same-colored piece
        }
        r += dir.row;
        c += dir.col;
      }
    }

    return moves;
  }
}

class Queen {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'queen';
  }

  validMoves(board) {
    let moves = [];
    let directions = [
      { row: 1, col: 0 },  // Down
      { row: -1, col: 0 }, // Up
      { row: 0, col: 1 },  // Right
      { row: 0, col: -1 }, // Left
      { row: 1, col: 1 },   // Down-Right
      { row: 1, col: -1 },  // Down-Left
      { row: -1, col: 1 },  // Up-Right
      { row: -1, col: -1 }, // Up-Left
    ];

    for (let dir of directions) {
      let r = this.row + dir.row;
      let c = this.col + dir.col;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === null) {
          moves.push({ row: r, col: c });
        }
        else if (board[r][c].color !== this.color) {
          moves.push({ row: r, col: c }); // Capture opponent's piece
          break;
        }
        else {
          break; // Blocked by same-colored piece
        }
        r += dir.row;
        c += dir.col;
      }
    }

    return moves;
  }
}

class King {
  constructor(color, row, col) {
    this.color = color; 
    this.row = row;
    this.col = col;
    this.type = 'king';
  }

  validMoves(board) {
    let moves = [];
    let directions = [
      { row: 1, col: 0 },  // Down
      { row: -1, col: 0 }, // Up
      { row: 0, col: 1 },  // Right
      { row: 0, col: -1 }, // Left
      { row: 1, col: 1 },   // Down-Right
      { row: 1, col: -1 },  // Down-Left
      { row: -1, col: 1 },  // Up-Right
      { row: -1, col: -1 }, // Up-Left
    ];

    for (let dir of directions) {
      let r = this.row + dir.row;
      let c = this.col + dir.col;
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[r][c] === null || board[r][c].color !== this.color) {
          moves.push({ row: r, col: c });
        }
      }
    }

    return moves;
  }
}


function mousePressed(){
  function handlePieceMovement() {
    let worldX = mouseX - width / 2;
    let worldY = mouseY - height / 2;
    if (
      worldX >= -size * 4 && worldX <= size * 4 &&
      worldY >= -size * 4 && worldY <= size * 4
    ) {
      let row = Math.floor((worldY + size * 4) / size); // Calculate row based on mouse position
      let col = Math.floor((worldX + size * 4) / size); // Calculate column based on mouse position
  
      // If no piece is selected, pick up the piece on first click
      if (selectedX === null && selectedY === null) {
        if (chessBoard.pieces[row][col]) { // Check if there's a piece
          selectedX = row; // Set selected row
          selectedY = col; // Set selected column
        }
      } 
      // If a piece is already selected, move the selected piece on second click
      else {
        const piece = chessBoard.pieces[selectedX][selectedY]; // Get the selected piece
        chessBoard.pieces[row][col] = piece; // Place the piece in the new location
        chessBoard.pieces[selectedX][selectedY] = null; // Remove the piece from its original location
  
        selectedX = null; // Deselect the piece after moving
        selectedY = null; // Deselect the piece after moving
      }
    }
  }
  handlePieceMovement();
}

