// Terrain Generator Assignment 02
// Priyansh Jhanji
// 3rd March 2025

let yLimit;
let yHeight;
let rectWidth;

let mySeed;
let noiseStart = 5;
let noiseTime;
let noiseSpeed = 0.01;
let totalHeight = 0;
let numRectangles = 0;
let averageHeight = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  yLimit = windowHeight - 10;
  yHeight = random(0, yLimit);
  rectWidth = width / 20;
  mySeed = random(9999);
  randomSeed(mySeed); 
}

function draw() {
  noiseTime = noiseStart;
  randomSeed(mySeed); 
  generateTerrain();
  noiseStart += noiseSpeed; 
  findAverage();
}

function generateTerrain() {
  totalHeight = 0; 
  numRectangles = 0;
  
  let x = 0;
  let randomNum;
  let highestX = 0;
  let highestY = height;

  background("white");

  while (x < width) {
    randomNum = noise(noiseTime) * 100;  
    let rectHeight = map(randomNum, 0, 100, 50, yHeight);  
    let rectY = height - rectHeight;

    fill("black");
    rect(x, rectY, rectWidth, rectHeight);

    if (rectY < highestY) { 
      highestY = rectY;
      highestX = x;
    }

    totalHeight += rectHeight;
    numRectangles++;

    x += rectWidth;
    noiseTime += noiseSpeed; 
  }
  averageHeight = totalHeight / numRectangles;
  drawFlag(highestX, highestY);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(10, rectWidth - 20);
  } else if (keyCode === RIGHT_ARROW) {
    rectWidth = min(40, rectWidth + 20);
  }
  generateTerrain();
}

function findAverage(){
  fill('red');
  rect(0, windowHeight - averageHeight, windowWidth, 10);
}

function drawFlag(x, y) {
  fill('black');
  rect(x + rectWidth / 2 - 2, y - 30, 4, 30);
  fill('red');
  rect(x + rectWidth / 2, y - 30, 20, 15);
}


