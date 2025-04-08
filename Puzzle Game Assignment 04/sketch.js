// Puzzle Game Assignment 04
// Priyansh Jhanji
// 4th March 2025
// A simple puzzle game that uses a 2D array to create a clickable grid.


let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridVal = [ [0,0,0,0,0],
                [255,0,255,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,0,0,0,0]]; 
                



function setup() {
  // Set canvas size and calculate width/height for each grid tile
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randomGrid(); // Generate a random grid at game start
}

function draw() {
  background(220);
  stroke(0); 
  determineActiveSquare();   // Get the current tile under the mouse
  drawGrid();  // Draw the grid and tile states
  drawOverlay();    // Draw overlay on the active tile and its neighbors  
  if (checkWin()) {
    fill('gold');
    textSize(64);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
    
}



function mousePressed(){
  if (keyIsDown(SHIFT)) {
    // If shift is held, only flip the tile under the mouse
    flip(currentCol, currentRow);
    return; // Exit early to skip flipping neighbors
  }

  // Otherwise, flip tile under mouse and its 4 neighbors (cross pattern)
  flip(currentCol, currentRow);
  flip(currentCol-1, currentRow);
  flip(currentCol+1, currentRow);
  flip(currentCol, currentRow-1);
  flip(currentCol, currentRow+1);
}


function flip(col, row){
  // Flip a tile's value from 0 to 255 or 255 to 0 if it's inside the grid
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridVal[row][col] === 0) gridVal[row][col] = 255;
      else gridVal[row][col] = 0;
    }
  }
}

function determineActiveSquare(){
  // Calculate the row and column the mouse is currently over
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  // Draw each grid tile with fill based on its value (0 or 255)
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridVal[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

// Function to check if all values in the grid are the same (either all 0 or all 255)
function checkWin() {
  let val = gridVal[0][0];
  for (let row of gridVal) {
    for (let cell of row){
      if(cell !==val){
        return false; // If any value differs, not a win
      }
    }
  }
  return true;
}

function drawOverlay() {
  noStroke();
  fill(0, 255, 0, 100);

  // Center
  if (currentCol >= 0 && currentCol < NUM_COLS && currentRow >= 0 && currentRow < NUM_ROWS) {
    rect(currentCol * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
  }

  // Left
  if (currentCol - 1 >= 0) {
    rect((currentCol - 1) * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
  }

  // Right
  if (currentCol + 1 < NUM_COLS) {
    rect((currentCol + 1) * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
  }


  stroke(0); // Restore stroke after drawing overlay
}


function randomGrid(){
  // Fill the grid randomly 
  for(let i = 0; i < NUM_ROWS; i++){
    for(let p = 0; p < NUM_COLS; p++){
      gridVal[i][p] = random([0,255]);
    }
  }
}
