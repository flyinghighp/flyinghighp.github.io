// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

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
  
  //WHITE//
  pieces.push (new Pieces(0,0,'white','rook'));
  pieces.push (new Pieces(0,1,'white','knight'));
  pieces.push (new Pieces(0,2,'white','bishop'));
  pieces.push (new Pieces(0,3,'white','queen'));
  pieces.push (new Pieces(0,4,'white','king'));
  pieces.push (new Pieces(0,5,'white','bishop'));
  pieces.push (new Pieces(0,6,'white','knight'));
  pieces.push (new Pieces(0,7,'white','rook'));

  pieces.push (new Pieces(1,0,'white','pawn'));
  pieces.push (new Pieces(1,1,'white','pawn'));
  pieces.push (new Pieces(1,2,'white','pawn'));
  pieces.push (new Pieces(1,3,'white','pawn'));
  pieces.push (new Pieces(1,4,'white','pawn'));
  pieces.push (new Pieces(1,5,'white','pawn'));
  pieces.push (new Pieces(1,6,'white','pawn'));
  pieces.push (new Pieces(1,7,'white','pawn'));
  
  // BLACK//
  pieces.push (new Pieces(6,0,'black','pawn'));
  pieces.push (new Pieces(6,1,'black','pawn'));
  pieces.push (new Pieces(6,2,'black','pawn'));
  pieces.push (new Pieces(6,3,'black','pawn'));
  pieces.push (new Pieces(6,4,'black','pawn'));
  pieces.push (new Pieces(6,5,'black','pawn'));
  pieces.push (new Pieces(6,6,'black','pawn'));
  pieces.push (new Pieces(6,7,'black','pawn'));

  pieces.push (new Pieces(7,0,'black','rook'));
  pieces.push (new Pieces(7,1,'black','knight'));
  pieces.push (new Pieces(7,2,'black','bishop'));
  pieces.push (new Pieces(7,3,'black','queen'));
  pieces.push (new Pieces(7,4,'black','king'));
  pieces.push (new Pieces(7,5,'black','bishop'));
  pieces.push (new Pieces(7,6,'black','knight'));
  pieces.push (new Pieces(7,7,'black','rook'));
}

function draw() {
  background(0);
  ambientLight(255);
  //orbitControl();
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
  //console.log('');
  chessBoard.makeSide();


  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let piece = boardData[row][col];
       
    }
  }
  
  chessBoard.drawBoard(0,0,hoveredX, hoveredY);

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
  constructor(col,row,color,piece) {
    this.row = row;
    this.col = col ;
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
    switch(this.color){     
    case'white':
      fill(215, 210, 225); 
      specularMaterial(215, 210, 225); break;
    case'black':
      fill(139, 69, 19); 
      specularMaterial(139, 69, 19); break;
    }
    switch(this.piece){
    case'bishop':
      model(biW);
      model(biB);
      
      break;
    case'pawn':
      model(wp);
      model(bp); 
      break;
    case'rook':
      model(wr); 
      model(br);
      break;
    case'knight':
      model(wkni);
      model(bkni);  
      break;
    case'king':
      model(wk); 
      model(bk);
      break;
    case'queen':
      model(qw); 
      model(qb);
      break;
      
    }
    pop();

  }
}

function mousePressed() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;

  let col = Math.floor((y + size * 4) / size);
  let row = Math.floor((x + size * 4) / size);

  if (row >= 0 && row < 8 && col >= 0 && col < 8) {
    for (let p of pieces) {
      if (p.row === row && p.col === col) {
        selectedPiece = p;
        console.log('drag');
        dragging = true;
        break;
      }
    }
  }
}

function mouseReleased() {
  if (dragging && selectedPiece) {
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;

    let newCol = Math.floor((y + size * 4) / size);
    let newRow = Math.floor((x + size * 4) / size);

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      selectedPiece.row = newRow;
      selectedPiece.col = newCol;
    }

    dragging = false;
    selectedPiece = null;
  }
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



