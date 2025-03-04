// Terrain Generator Assignment 02
// Priyansh Jhanji
// 3rd March 2025

let yLimit;
let yHeight;
let rectWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  yLimit = random(100, 300);
  yHeight = random(0, yLimit);
  rectWidth = width / 20;
  generateTerrain();
}

function draw() {
  
}

function generateTerrain() {
  let numRects = 20;
  let x = 0;

  background("white");

  while (x < width) {
    let rectHeight = random(50, height);
    fill("black");
    stroke("white");
    rect(x, height - rectHeight, rectWidth, rectHeight);
    x += rectWidth;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(10, rectWidth - 20);
  } else if (keyCode === RIGHT_ARROW) {
    rectWidth = min(40, rectWidth + 20);
  }
  generateTerrain();
}
