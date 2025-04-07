// Puzzle Game Assignment 04
// Priyansh Jhanji
// 4th March 2025
// Working with 2D Arrays, Visualization

//Insert your Comment Header here.

let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridData = [[0,0,0,0,0],
                [0,0,0,0,0],
                [0,255,0,0,0],
                [255,255,255,0,0]];



function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randomGrid(); //Generate a random grid at the start of the game
}

function draw() {
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();       //render the current game board to the screen (and the overlay)
  if (checkWin()) {
    fill('gold');
    textSize(64);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}



function mousePressed(){
  if (keyIsDown(SHIFT)) {
    // Shift-click only flips the tile under the mouse 
    flip(currentCol, currentRow);
    return; // exit early so it doesn't flip the rest
  }

  // cross-shaped pattern flips on a mouseclick
  flip(currentCol, currentRow);
  flip(currentCol-1, currentRow);
  flip(currentCol+1, currentRow);
  flip(currentCol, currentRow-1);
  flip(currentCol, currentRow+1);
}


function flip(col, row){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}

function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

// Function to check if all values in the grid are the same (either all 0 or all 255)
function checkWin() {
  let val = gridData[0][0];
  for (let row of gridData) {
    for (let cell of row){
      if(cell !==val){
        return false; // if any cell is different retun false
      }
    }
  }
  return true;
}

function randomGrid(){
  //Function to generate a random grid at the start of the game
  for(let i = 0; i < NUM_ROWS; i++){
    for(let p = 0; p < NUM_COLS; p++){
      gridData[i][p] = random([0,255]);
    }
  }
}