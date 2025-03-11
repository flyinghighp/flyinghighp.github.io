// Terrain Generator Assignment 02
// Priyansh Jhanji
// 3rd March 2025

// This program generates a terrain using Perlin noise, 
// with adjustable rectangle width using arrow keys. It shows the 
// average height and places a flag at the highest point.


//Global Varaibles
let yLimit;
let yHeight;
let rectWidth;
let noiseStart = 5;
let noiseTime;
let noiseSpeed = 0.01;
let totalHeight = 0;
let averageHeight;

function setup() {
  // Setup the canvas and initialize variables
  createCanvas(windowWidth, windowHeight);
  yLimit = windowHeight - 10;
  yHeight = random(0, yLimit);
  rectWidth = width / 20;
}

function draw() {
  noiseTime = noiseStart;
  generateTerrain();
  noiseStart += noiseSpeed;
  findAverage(); // Find and display the average height of terrain
}

// Generates terrain using noise
function generateTerrain() {
  let totalHeight = 0;
  let numRectangles = 0;
  
  let x = 0;
  let randomNum;
  let highestX = 0;
  let highestY = height;

  background("white");

  while (x < width) { 
    randomNum = noise(noiseTime) * 150;
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
  drawFlag(highestX, highestY); // Draw a flag at the highest point
}

function keyPressed() {
  // Adjust the width of rectangles based on left or right arrow key
  if (keyCode === LEFT_ARROW) {
    rectWidth = max(10, rectWidth - 20);
  } 
  else if (keyCode === RIGHT_ARROW) {
    rectWidth = min(40, rectWidth + 20);
  }
  generateTerrain(); // Re-generate terrain with updated rectangle width
}

function findAverage(){
  // Display a red line representing the average height of terrain
  fill('red');
  rect(0, windowHeight - averageHeight, windowWidth, 10);
}

function drawFlag(x, y) {
  // Draw a flag at the highest point of the terrain
  fill('black');
  rect(x + rectWidth / 2 - 2, y - 30, 4, 30); // Flag pole
  fill('red');
  rect(x + rectWidth / 2, y - 30, 20, 15); // Flag
}