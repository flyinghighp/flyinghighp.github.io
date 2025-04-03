// 2D Array Basics
// Priyansh Jhanji
// 4th March 2025
//Working with 2D Arrays, Visualization

let grid = 
[ [240,   60,  120, 180, 240],
  [240, 180, 120,   60,  0],
  [0,   200,   0,   200, 0],
];

let squareSize = 60;
const NUM_ROWS = 3; const NUM_COLS = 5;

function setup() {
  createCanvas(NUM_COLS*squareSize, NUM_ROWS*squareSize);
}

function renderGrid(){
  // interpret the information in the 2D array, and draw
  // a grid of colors on the screen to reflect it
  for (let y = 0; y < NUM_ROWS; y++){
    for (let x = 0; x < NUM_COLS; x++){
      let fillColor = grid[y] [x];
      fill(fillColor);
      square(x*squareSize, y*squareSize, squareSize);
    }
  }
}

function getCurrentY(){
  //determine current row of the mouse position
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / squareSize);
}

function getCurrentX(){
  //determine current coloumn of the mouse position
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / squareSize);
}

function checkForMouse(){
  // fill current tile to a random greyscale
  if(mouseIsPressed){
    let x = getCurrentX();
    let y = getCurrentY();
    grid[y][x] = floor(random(255));
  }
}

function draw() {
  background(220);
  renderGrid();
  checkForMouse();
}
