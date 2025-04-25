// Final Project - Chess 
// Priyansh Jhanji
// 25 April 2025

let board = [];
let size;
let cam;
let pieces = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 700, 500);
  cam.lookAt(0, 0, 0);

  size = min(width, height) / 10;
  createBoard(0, 0);  
}

function draw() {
  background(0);
  makeSide();
  drawBoard(0, 0); 
}

function createBoard(i, j) {
  if (i >= 8){ 
    return;
  }

  if (!board[i]) {
    board[i] = [];
  }

  board[i][j] = (i + j) % 2 === 0 ? '#c7c9c8' : '#2b1101';

  if (j < 7) {
    createBoard(i, j + 1);
  }
  else {
    createBoard(i + 1, 0);
  }
}

function makeSide(){
  push();
  fill('#8B4513'); 
  noStroke();


  translate(0, -size * 4 - size / 2, 0);
  plane(size * 8 + size, size / 2); // top
  translate(0, size * 8 + size, 0);
  plane(size * 8 + size, size / 2); // bottom

  // Left and right borders
  translate(-(size * 4 + size / 2), -size * 4 - size / 2, 0);
  rotateZ(HALF_PI);
  plane(size * 8 + size, size / 2); // left
  translate(0, -(size * 8 + size), 0);
  plane(size * 8 + size, size / 2); // right
  pop();

}

function drawBoard(i, j) {
  if (i >= 8){ 
    return;
  }

  push();
  translate(-size * 4 + j * size + size / 2, -size * 4 + i * size + size / 2, 0); // center and position each tile
  fill(board[i][j]);
  noStroke();
  plane(size, size); // draw a flat square
  pop();

  if (j < 7) {
    drawBoard(i, j + 1);
  } 
  else {
    drawBoard(i + 1, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  size = min(width, height) / 10;
}

