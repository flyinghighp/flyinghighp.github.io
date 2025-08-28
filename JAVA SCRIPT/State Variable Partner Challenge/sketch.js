let x = 0;
let y = 0;
let speed = 7;
let direction = "right";
let square = 60;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  drawSquare();

  switch (direction) {
  case "right":
    x += speed;
    if (x + square >= width) {
      direction = "down";
    }
    break;
  case "down":
    y += speed;
    if (y + square >= height) {
      direction = "left";
    }
    break;
  case "left":
    x -= speed;
    if (x <= 0) {
      direction = "up";
    }
    break;
  case "up":
    y -= speed;
    if (y <= 0) {
      direction = "right";
    }
    break;
  }
  if (keyIsPressed && key === 'A'){
    square = square-100;
  }
}


function drawSquare() {
  fill('gray');
  rect(x, y, square, square);


}

