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
let pieces;


  
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
  pieces = new Pieces(0,0,'white','rook');
  pieces = new Pieces(0,1,'white','knight');
  pieces = new Pieces(0,2,'white','bishop');
  pieces = new Pieces(0,3,'white','queen');
  pieces = new Pieces(0,4,'white','king');
  pieces = new Pieces(0,5,'white','bishop');
  pieces = new Pieces(0,6,'white','knight');
  pieces = new Pieces(0,7,'white','rook');
}

function draw() {
  background(0);
  ambientLight(255);
  directionalLight(255, 255, 255, 0, 1, -1);
  let worldX = mouseX - width / 2;
  let worldY = mouseY - height / 2;

  pieces.display();

  // Variables to store the hovered square
  let hoveredX = 1;
  let hoveredY = 1;

  // Calculate grid position for X and Y
 
  if (worldX >= -size * 4 && worldX <= size * 4 &&
      worldY >= -size * 4 && worldY <= size * 4) {
    
    hoveredX = Math.floor((worldY + size * 4) / size);
    hoveredY = Math.floor((worldX + size * 4) / size);
  }
  console.log('');
  chessBoard.makeSide();


  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let piece = boardData[row][col];
       
    }
  }
  
  chessBoard.drawBoard(0,0,hoveredX, hoveredY);

}

function getBoardPosition(row, col, z = 76) {
  const x = -size * 4 + col * size + size / 2;
  const y = -size * 4 + row * size + size / 2;
  return { x, y, z };
}

//-------------------//
//     PIECES       //
//-------------------//
class Pieces {
  constructor(col,row,color,piece) 
    {this.row = row;
    this.col = col ;
    this.color = color;
    this.piece = piece;
  }

 


  display() {
    push();
    let pos= getBoardPosition(this.col, this.row); 
    translate(pos.x, pos.y, pos.z);
    scale(0.7); 
    rotate(130); 
    rotateX(-90);
    rotateZ(90);
    rotateY(-90);
    stroke(110);
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
      model(biW); break;
      case'pawn':
      model(wp); break;
      case'rook':
      model(wr); break;
      case'knight':
      model(wkni); break;
      case'king':
      model(wk); break;
      case'queen':
      model(qw); break;
      
    }
    pop();


  }

  // makeBwbtwo() {
  //   push();
  //   translate(-size * 4 + 5 * size + size / 2, -size * 4 + 0 * size + size / 2, 76);
  //   scale(0.7);  
  //   rotate(130); 
  //   rotateX(-90);
  //   rotateZ(90);
  //   rotateY(-90);
  //   stroke(110);
  //   strokeWeight(0.8);
  //   fill(215, 210, 225);        
  //   specularMaterial(215, 210, 225);
  //   model(biW);
  //   pop();
  // }
}

// class blackBishop {
//   constructor() {}

//   makeBbone() {
//     push();
//     translate(-size * 4 + 2 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
//     scale(0.7);  
//     rotate(130); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackBishopModel);
//     pop();
//   }

//   makeBbtwo() {
//     push();
//     translate(-size * 4 + 5 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
//     scale(0.7); 
//     rotate(130); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackBishopModel);
//     pop();
//   }
// }

// class whiteKing {
//   constructor() {}

//   makeKingone() {
//     push();
    
//     translate(-size * 4 + 3 * size + size / 2, -size * 4 + 0 * size + size / 2, 76); 
//     scale(0.7);  
//     rotate(50); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteKingModel);
//     pop();
//   }
// }

// class blackKing {
//   constructor() {}

//   makeKingtwo() {
//     push();
    
//     translate(-size * 4 + 3 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
//     scale(0.7);  
//     rotate(50); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackKingModel);
//     pop();
//   }
// }

// class whiteQueen {
//   constructor() {}

//   makeQueenone() {
//     push();
    
//     translate(-size * 4 + 4 * size + size / 2, -size * 4 + 0 * size + size / 2, 76); 
//     scale(0.7);  
//     rotate(50); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteQueenModel);
//     pop();
//   }
// }

// class blackQueen {
//   constructor() {}

//   makeQueentwo() {
//     push();
    
//     translate(-size * 4 + 4 * size + size / 2, size * 3 + 0 * size + size / 2, 76);
//     scale(0.7);  
//     rotate(23); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackQueenModel);
//     pop();
//   }
// }

// class whiteRook {
//   constructor() {}

//   makeRookone() {
//     push();
    
//     translate(-size * 4 + 0 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
//     scale(0.5);  
     
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteRookModel);
//     pop();
//   }

//   makeRooktwo() {
//     push();
    
//     translate(-size * 4 + 7 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
//     scale(0.5);  
    
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteRookModel);
//     pop();
//   }
// }

// class blackRook {
//   constructor() {}

//   makeRookbone() {
//     push();
    
//     translate(-size * 4 + 0 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
//     scale(0.5);   
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackRookModel);
//     pop();
//   }

//   makeRookbtwo() {
//     push();
    
//     translate(-size * 4 + 7 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
//     scale(0.5);  
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackRookModel);
//     pop();
//   }
// }

// class blackKnight {
//   constructor() {}

//   makeKnightbone() {
//     push();
    
//     translate(-size * 4 + 1 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
//     scale(0.5);   
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     rotate(180);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackKnightModel);
//     pop();
//   }

//   makeKnightbtwo() {
//     push();
    
//     translate(-size * 4 + 6 * size + size / 2, size * 3 + 0 * size + size / 2, 50);
//     scale(0.5);   
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     rotate(180);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(139, 69, 19);         
//     specularMaterial(139, 69, 19);
//     model(blackKnightModel);
//     pop();
//   }
// }

// class whiteKnight {
//   constructor() {}

//   makeKnightone() {
//     push();

//     translate(-size * 4 + 1 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
//     scale(0.5);  
//     rotate(180); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     rotate(180);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteKnightModel);
//     pop();
//   }

//   makeKnighttwo() {
//     push();
    
//     translate(-size * 4 + 6 * size + size / 2, -size * 4 + 0 * size + size / 2, 50); 
//     scale(0.5);  
//     rotate(180); 
//     rotateX(-90);
//     rotateZ(90);
//     rotateY(-90);
//     rotate(180);
//     stroke(110);
//     strokeWeight(0.8);
//     fill(215, 210, 225);        
//     specularMaterial(215, 210, 225);
//     model(whiteKnightModel);
//     pop();
//   }
// }



// class whitePawn {
//   constructor() {}
  
//   makeAll() {
//     for (let i = 0; i < 8; i++) {
//       push();
      
//       translate(-size * 4 + i * size + size / 2, -size * 3 + size / 2, 50);
//       scale(0.5);
//       rotateX(-90);
//       rotateZ(90);
//       rotateY(-90);
      
//       stroke(110);
//       strokeWeight(0.8);
//       fill(215, 210, 225);        
//       specularMaterial(215, 210, 225);
//       model(whitePawnModel);
//       pop();
//     }
//   }
// }
  
// class blackPawn {
//   constructor() {}
  
//   makeAll() {
//     for (let i = 0; i < 8; i++) {
//       push();
      
//       translate(-size * 4 + i * size + size / 2, size * 2 + size / 2, 50);
//       scale(0.5);
//       rotateX(-90);
//       rotateZ(90);
//       rotateY(-90);
      
//       stroke(110);
//       strokeWeight(0.8);
//       fill(139, 69, 19);         
//       specularMaterial(139, 69, 19);
//       model(blackPawnModel);
//       pop();
//     }
//   }
// }




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



