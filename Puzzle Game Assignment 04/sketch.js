// Puzzle Game Assignment 04
// Priyansh Jhanji
// 4th March 2025
// A puzzle game that uses a 2D array to create a clickable grid puzzle.

let NUM_ROWS = 5;  // Number of rows in the grid
let NUM_COLS = 5;  // Number of columns in the grid
let rectWidth, rectHeight;  // Dimensions for each grid square
let currentRow, currentCol;  // Current active row and column 

// Initial grid values (0 or 255)
let gridVal = [ [0,0,0,0,0],  
                [255,0,255,0,0],  
                [0,0,0,0,0],  
                [0,255,0,0,0],  
                [255,0,0,0,0]];  


let sqFlip = false; 

// Set up canvas and grid dimensions
function setup() {
  createCanvas(windowWidth, windowHeight);  
  rectWidth = width / NUM_COLS; 
  rectHeight = height / NUM_ROWS;  
  randomGrid();  
}


function draw() {
  background(220);  // Set background color
  stroke(0); 
  determineActiveSquare();  // Get the current active square based on mouse position
  drawGrid();  // Draw the grid based on current values
  drawOverlay(); 

  // Check if the player has won
  if (checkWin()) {
    fill('gold');  
    textSize(64);  
    textAlign(CENTER, CENTER); 
    text("You Win!", width / 2, height / 2);  
  }
}

// Triggered when mouse is pressed
function mousePressed(){
  if (keyIsDown(SHIFT)) {
    flip(currentCol, currentRow);  // Flip only the clicked square if SHIFT is held down
    return; 
  }

  if (sqFlip) {
    // Square flip pattern 
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        flip(currentCol + x, currentRow + y);  
      }
    }
  } 
  else {
    // Cross flip pattern 
    flip(currentCol, currentRow);  // Flip the Center square
    flip(currentCol - 1, currentRow);  // Flip left square
    flip(currentCol + 1, currentRow);  // Flip right square
    flip(currentCol, currentRow - 1);  // Flip top square
    flip(currentCol, currentRow + 1);  // Flip bottom square
  }
}

// Triggered when a key is pressed
function keyPressed() {
  if (keyCode === 32) {
    sqFlip = !sqFlip;  // Toggle between square flip and cross flip with the space bar
  }
}

// Flip a square at the specified column and row
function flip(col, row) {
  if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
    gridVal[row][col] = gridVal[row][col] === 0 ? 255 : 0;
  }
}

// Determine the current square based on mouse position
function determineActiveSquare(){
  currentRow = int(mouseY / rectHeight);  
  currentCol = int(mouseX / rectWidth); 
}

// Draw the grid on the canvas
function drawGrid(){
  for (let x = 0; x < NUM_COLS; x++){  
    for (let y = 0; y < NUM_ROWS; y++){  
      fill(gridVal[y][x]);  
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);  
    }
  }
}

// Check if the game has been won (if all squares are the same color)
function checkWin() {
  let val = gridVal[0][0];  
  for (let row of gridVal) {  
    for (let cell of row) {  
      if(cell !== val) return false;  
    }
  }
  return true;  // All cells match, return true (win)
}

// Draw the overlay 
function drawOverlay() {
  noStroke();  
  fill(0, 255, 0, 100);  // Set green fill

  if (keyIsDown(SHIFT)) {
    // Draw single square if SHIFT is pressed
    rect(currentCol * rectWidth, currentRow * rectHeight, rectWidth, rectHeight);
  } 
  else if (sqFlip) {
    // Draw a 2x2 square if square flip is active
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        let col = currentCol + x;  
        let row = currentRow + y;  
        if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
          rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);  
        }
      }
    }
  } 
  else {
    // Draw cross pattern overlay
    for (let i = 0; i < 5; i++) {
      let col = currentCol; 
      let row = currentRow;  
      if (i === 1) col -= 1;  // Left
      if (i === 2) col += 1;  // Right
      if (i === 3) row -= 1;  // Up
      if (i === 4) row += 1;  // Down

      if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
        rect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);  // Draw cross overlay
      }
    }
  }
}

// Initialize the grid with random filled squares
function randomGrid(){
  for(let r = 0; r < NUM_ROWS; r++){  
    for(let c = 0; c < NUM_COLS; c++){  
      gridVal[r][c] = random([0, 255]); 
    }
  }
}
