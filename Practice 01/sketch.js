// Practice 01 - Bouncing Ball
// Priyansh Jhanji
// February 8, 2025

let x;
let y;
let xSpeed = 5;
let ySpeed = 5;

function setup() {

  createCanvas(500, 500);
  x = random(25, width -25);
  y = random(25, height -25);
}

function draw() {
  background(220);
  
  fill("mediumblue");
  circle(x, y, 50); // Use x and y for the position of the circle

  fill("black");
  rect(250, 250, 400, 50); // Draw the rectangle

  // Move the ball
  x += xSpeed;
  y += ySpeed;

  // Check for collision with the rectangle
  if (x + 25 > 250 && x - 25 < 500 && y + 25 > 250 && y - 25 < 300) {
    // Reverse the direction of the ball
    xSpeed *= -1;
    ySpeed *= -1;
  }

  // Check for collision with the edges of the canvas
  if (x < 25 || x > width - 25) {
    xSpeed *= -1;
  }
  if (y < 25 || y > height - 25) {
    ySpeed *= -1;
  }

  // Move the rectangle with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 5;
    if (x < 0) {
      x = width;
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5;
    if (x > width) {
      x = 0;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    y = y - 5;
    if (y < 0) {
      y = height;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    y = y + 5;
    if (y > height) {
      y = 0;
    }
  }
}