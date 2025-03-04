// Terrain Generator Assignment 02
// Priyansh Jhanji
// 3rd March 2025

let yLimit;
let yHeight;
let rectWidth;

let mySeed;
let noiseStart = 5;
let noiseTime;
let noiseSpeed = 0.1;
let totalHeight = 0;
let numRectangles = 0;
let averageHeight = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  yLimit = windowHeight - 20;
  yHeight = random(0, yLimit);
  rectWidth = width / 20;
  mySeed = random(100);
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

  background("white");

  while (x < width) {
    randomNum = noise(noiseTime) * 100; 
    let rectHeight = map(randomNum, 0, 100, 50, yHeight); 

    fill("black");
    
    rect(x, height - rectHeight, rectWidth, rectHeight);

    x += rectWidth;
    noiseTime += noiseSpeed; 

    totalHeight += rectHeight;
    numRectangles++;
  }
  averageHeight = totalHeight/numRectangles;
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
  rect(0,windowHeight-averageHeight,windowWidth,10);
}

