// Fractal Assignment 05
// Priyansh Jhanji
// 16 April 2025
// Circular fractal that spins, zooms on drag, and has dynamic color

let scaleFactor = 1;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB, 360, 50, 100);
  noFill();
}

function draw() {
  background(25);
  translate(width / 2, height / 2);
  scale(scaleFactor);

  let branches = 15;
  for (let i = 0; i < branches; i++) {
    push();
    rotate(i * (360 / branches) + frameCount);
    drawFractal(0, 90, 120, 6);
    pop();
  }
}

function drawFractal(x, y, l, depth) {
  if (depth <= 0 || l < 5) return;

  let hueVal = (frameCount + depth * 40) % 360;
  stroke(hueVal, 40, 100);
  strokeWeight(map(depth, 1, 0, 0.2, 1.5));
  line(x, y, x, y - l);

  let nx = x;
  let ny = y - l;

  circle(nx, ny, l / 1.5);
  circle(nx + l / 4, ny, l / 3);
  circle(nx - l / 4, ny, l / 3);

  drawFractal(nx, ny, l * 0.65, depth - 1);
}

function mouseDragged() {
  if (mouseY < height / 2) {
    scaleFactor += 0.05;
  } else {
    scaleFactor -= 0.05;
  }
  scaleFactor = constrain(scaleFactor, 0.2, 3);
}
