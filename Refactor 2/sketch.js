// Refactor 2 Practice
// Priyansh Jhanji
// 11th March 2025
// Program that highlights the quadrant based on mouse position

function setup() { 
  createCanvas(480, 270);
}

function draw() {
  background(255);
  drawGrid(); 
  highlightQuadrant(); 
}

// Function to draw the grid lines
function drawGrid() {
  stroke(0); 
  line(240, 0, 240, 270); // Vertical line
  line(0, 135, 480, 135); // Horizontal line
}


// Function to highlight the quadrant based on mouse position
function highlightQuadrant() {
  noStroke(); 
  fill(0); 

  if (mouseX < 240 && mouseY < 135) {
    rect(0, 0, 240, 135); // Top-left quadrant
  } else if (mouseX > 240 && mouseY < 135) {
    rect(240, 0, 240, 135); // Top-right quadrant
  } else if (mouseX < 240 && mouseY > 135) {
    rect(0, 135, 240, 135); // Bottom-left quadrant
  } else if (mouseX > 240 && mouseY > 135) {
    rect(240, 135, 240, 135); // Bottom-right quadrant
  }
}