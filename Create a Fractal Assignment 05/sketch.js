// Fractal Assignment 05
// Priyansh Jhanji
// 16 April 2025
// 
// Description:
// A circular fractal that spins, zooms, and changes colors dynamically. 
// Users can zoom in and out by dragging the mouse, and pause the animation with the spacebar.
//
// Production Rules:
// 1. Start with a vertical line.
// 2. Draw circles at the tip of the line depending on zoom level.
// 3. Recursively draw smaller lines at the tip of each previous line.
// 4. Reduce line length by 65% at each recursion step.
// 5. Stop when line length is small enough or depth reaches 0.

let scaleFactor = 1;         
let paused = false;          
let rotationSpeed = 30;    

function setup() {
  createCanvas(600, 600);         
  frameRate(60);                  
  angleMode(DEGREES);             
  colorMode(HSB, 360, 50, 100);  
  noFill();                       
}

function draw() {
  background(25, 20);              
  translate(width / 2, height / 2); 
  scale(scaleFactor);             

  let branches = 15;              // Number of branches in the fractal
  for (let i = 0; i < branches; i++) {
    push(); 
    rotate(i * (360 / branches) + frameCount * rotationSpeed); // Rotate each branch 
    drawFractal(0, 90, 120, 6); // Draw the fractal at the tip
    pop(); 
  }

  // Control rotation speed based on pause state
  if (paused) {
    rotationSpeed = 0;
  } else {
    rotationSpeed = 30;
  }
}

// Function to draw the fractal
function drawFractal(x, y, l, depth) {
  if (depth <= 0 || l < 5) {
    return; // Stop  when depth reaches 0 or line length becomes too small
  }

  let hueVal = (frameCount + depth * 40) % 360;
  stroke(hueVal, 40, 100);                     
  strokeWeight(map(depth, 1, 0, 0.2, 1.5));    

  line(x, y, x, y - l); 

  let nx = x;          
  let ny = y - l;      

  // Draw circles at the tip of each line (changes based on zoom level)
  if (scaleFactor > 0.45) {
    circle(nx, ny, l / 1.5);
    circle(nx + l / 4, ny, l / 3);
    circle(nx - l / 4, ny, l / 3);
  } else {
    circle(nx, ny, l / 1.5);
    circle(nx + l / 4, ny, l - 3);
    circle(nx - l / 4, ny, l + 3);
    circle(nx / l / 4, ny, l * 3);
    circle(nx * l / 4, ny, l / 3);
  }

  // Recursively draw smaller fractals
  drawFractal(nx, ny, l * 0.65, depth - 1); // Reduce length and depth for next recursion
}

function mouseDragged() {
  // Zoom in or out based on mouse position
  if (mouseY < height / 2) {
    scaleFactor += 0.05;  // Zoom in
  } else {
    scaleFactor -= 0.05;  // Zoom out
  }
  scaleFactor = constrain(scaleFactor, 0.2, 3); // Limit the zoom range
}

function keyPressed(){
  // Pause when spacebar is pressed
  if (keyCode === 32) {
    paused = !paused;
  }
}
