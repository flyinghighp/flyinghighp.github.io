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

function preload() {
  blackBishopModel = loadModel('assets/Bishop Black v2.obj', true, );
  whiteBishopModel = loadModel('assets/Bishop White.obj', true);
  blackKingModel = loadModel('assets/King Black.obj', true);
  whiteKingModel = loadModel('assets/King White.obj', true);
  whiteKnightModel = loadModel('assets/Knight White.obj', true);
  woodTexture = loadImage('assets/woodtexture.jpg', true); 
}

function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 700, 500);
  cam.lookAt(0, 0, 0);
  angleMode(RADIANS);
  
  size = min(width, height) / 10;
  chessBoard = new ChessBoard();
  chessBoard.createBoard(0, 0);

  bishopBlackpiece = new blackBishop(); 
  bishopWhitepiece = new whiteBishop();
}

function draw() {
  background(0);
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 1, -1);
  

  chessBoard.makeSide();
  chessBoard.drawBoard(0, 0);

  bishopBlackpiece.makeBbone();
  bishopBlackpiece.makeBbtwo();

  bishopWhitepiece.makeBbone();
  bishopWhitepiece.makeBbtwo();

}
class blackBishop {
  constructor() {}

  makeBbone() {
    push();
    translate(-size * 4 + 2 * size + size / 2, -size * 4 + 0 * size + size / 2, 76);
    scale(0.75);
    rotate(23); 
    rotateX(-HALF_PI);
    rotateZ(HALF_PI);
    rotateY(-HALF_PI);

    
    stroke(255, 255, 255, 100);  
    strokeWeight(1);  

    noFill();  
    ambientMaterial('#401f0b');  
    model(blackBishopModel);
    pop();
  }

  makeBbtwo() {
    push();
    translate(-size * 4 + 5 * size + size / 2, -size * 4 + 0 * size + size / 2, 76);
    scale(0.75);
    rotate(23); 
    rotateX(-HALF_PI);
    rotateZ(HALF_PI);
    rotateY(-HALF_PI);

    
    stroke(255, 255, 255, 100);  
    strokeWeight(1);  

    noFill();  
    ambientMaterial('#401f0b');  
    model(blackBishopModel);
    pop();
  }
}

class whiteBishop {
  constructor() {}

  makeBbone() {
    push();
    translate(-size * 4 + 2 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.75);
    rotate(23); 
    rotateX(-HALF_PI);
    rotateZ(HALF_PI);
    rotateY(-HALF_PI);

    
    stroke(0, 0, 0, 100);  
    strokeWeight(1);  

    noFill();  
    ambientMaterial('#e0d0c5');  
    model(whiteBishopModel);
    pop();
  }

  makeBbtwo() {
    push();
    translate(-size * 4 + 5 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
    scale(0.75);
    rotate(23); 
    rotateX(-HALF_PI);
    rotateZ(HALF_PI);
    rotateY(-HALF_PI);

    
    stroke(0, 0, 0, 100);  
    strokeWeight(1);  

    noFill();  
    ambientMaterial('#e0d0c5');  
    model(whiteBishopModel);
    pop();
  }
}


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
    box(size * 8 + size, size / 2,thickness);

    translate(0, size * 8 + size/2, 0);
    box(size * 8 + size, size / 2,thickness);

    translate(-(size * 3.75 + size / 2), -size * 3.75 - size / 2, 0);
    rotateZ(HALF_PI);
    box(size * 8 + size, size / 2, thickness);

    translate(0, -(size * 8 + size/2), 0);
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
}
