// Coordinate Systems and User Events
// Priyansh Jhanji
// 6th February 2025
//Not run-to-completion, but interactive programs...


function setup() {
  // runs ONCE, at the very beginning...
  createCanvas(500, 500);
}

function draw() {
  // draw LOOP , repeats over and forever...
  // - target of 60 frames per second
  // A new image is drawn at the bottom of the loop
  background(220);
  fiveCircles(); // call the function
  // secret calculated delay()
  //screen updates at end of loop
}

function fiveCircles() {
  // draw two circles
  // and one at the mouse location
  fill(0, 255, 0); // green fill
  stroke(255, 0, 0); // red stroke
  strokeWeight(5); // thickness of 5 pixels
  circle(0, 0, 100);
  
  fill(0, 255, 0); // green fill
  stroke(255, 0, 0); // red stroke
  strokeWeight(5); // thickness of 5 pixels
  circle(0, height, 100);
  
  fill(0, 255, 0); // green fill
  stroke(255, 0, 0); // red stroke
  strokeWeight(5); // thickness of 5 pixels
  circle(width, 0, 100);
  
  fill(0, 255, 0); // green fill
  stroke(255, 0, 0); // red stroke
  strokeWeight(5); // thickness of 5 pixels
  circle(width/2 , height/2, 100);
  
  fill(0, 255, 0); // green fill
  stroke(255, 0, 0); // red stroke
  strokeWeight(5); // thickness of 5 pixels
  circle(width, height, 100);

  

  //noStroke(); // turns off outlines
  //fill(255, 0, 0); // red fill
  //circle(mouseX, mouseY, 200);
}