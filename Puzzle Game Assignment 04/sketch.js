// Puzzle Game Assignment 04
// Priyansh Jhanji
// 4th March 2025
// A simple puzzle game that uses a 2D array to create a clickable grid.

let NUM_ROWS = 5;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridVal = [ [0,0,0,0,0],
                [255,0,255,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,0,0,0,0]]; 
                
let sqFlip = false; // false = cross, true = square


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth = width / NUM_COLS;
  rectHeight = height / NUM_ROWS;
  randomGrid();
}

function draw() {
  background(220);
  stroke(0); 
  determineActiveSquare();
  drawGrid();
  drawOverlay();
  
  if (checkWin()) {
    fill('gold');
    textSize(64);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function mousePressed(){
  if (keyIsDown(SHIFT)) {
    flip(currentCol, currentRow);
    return;
  }

  if (sqFlip) {
    // Square pattern
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        flip(currentCol + dx, currentRow + dy);
      }
    }
  } else {
    // Cross pattern
    flip(currentCol, currentRow);
    flip(currentCol - 1, currentRow);
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow - 1);
    flip(currentCol, currentRow + 1);
  }
}

function keyPressed() {
  if (key === ' ') {
    sqFlip = !sqFlip; // Toggle flip mode
  }
}

function flip(col, row){
  if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS){
    gridVal[row][col] = gridVal[row][col] === 0 ? 255 : 0;
  }
}

function determineActiveSquare(){
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridVal[y][x]); 
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}

function checkWin() {
  let val = gridVal[0][0];   
  for (let row of gridVal) {
    for (let cell of row){
      if(cell !== val){
        return false;
      }
    }
  }
  return true;
}

function drawOverlay() {
  noStroke();
  fill(0, 255, 0, 100);

  if (keyIsDown(SHIFT)) {
    if (currentCol >= 0 && currentCol < NUM_COLS && currentRow >= 0 && currentRow < NUM_ROWS) {
      rect(currentCol * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
    }
  } else {
    if (sqFlip) {
      // Square pattern overlay
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          let col = currentCol + x;
          let row = currentRow + y;
          if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
            rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
          }
        }
      }
    } else {
      // Cross pattern overlay
      if (currentCol >= 0 && currentCol < NUM_COLS && currentRow >= 0 && currentRow < NUM_ROWS) {
        rect(currentCol * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
      }
      if (currentCol - 1 >= 0) {
        rect((currentCol - 1) * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
      }
      if (currentCol + 1 < NUM_COLS) {
        rect((currentCol + 1) * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
      }
      if (currentRow - 1 >= 0) {
        rect(currentCol * rectWidth, (currentRow - 1) * rectHeight, rectWidth, rectHeight);
      }
      if (currentRow + 1 < NUM_ROWS) {
        rect(currentCol * rectWidth, (currentRow + 1) * rectHeight, rectWidth, rectHeight);
      }
    }
  }

  
}

function randomGrid(){
  for(let i = 0; i < NUM_ROWS; i++){
    for(let p = 0; p < NUM_COLS; p++){
      gridVal[i][p] = random([0, 255]);
    }
  }
}
