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
let brownPiece;
let whitePiece;


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
  cam.setPosition(0, 900, 500);
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

  orbitControl(2,2,2);

  chessBoard.makeSide();
  chessBoard.drawBoard(0, 0);

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

  createBoard(i, j) {
    if (i >= 8) {
      return;
    }

    if (!this.board[i]) {
      this.board[i] = [];
    }

    let lightColor = color('#c7c9c8');
    let darkColor = color('#2b1101');
    
    if ((i + j) % 2 === 0) {
      this.board[i][j] = lightColor;
    } 
    else {
      this.board[i][j] = darkColor;
    }
    
    if (j < 7) {
      this.createBoard(i, j + 1);
    } 
    else {
      this.createBoard(i + 1, 0);
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

  drawBoard(i, j) {
    if (i >= 8) {
      return;
    }

    push();
    translate(-size * 4 + j * size + size / 2, -size * 4 + i * size + size / 2, 0);
    fill(this.board[i][j]);
    noStroke();
    box(size, size, thickness);
    pop();

    if (j < 7) {
      this.drawBoard(i, j + 1);
    } 
    else {
      this.drawBoard(i + 1, 0);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  size = min(width, height) / 10;
  chessBoard = new ChessBoard();
  chessBoard.createBoard(0, 0);
}
