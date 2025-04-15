// 21a Square 2D Fractal
// Priyansh Jhanji
// 15 April 2025

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  randomSeed(1);
  squareFractal(width/2, height/2,height/2);
}

function squareFractal(x,y,sideL){

  fill (random(255), random(255), random(255), 100);
  noStroke();
  square(x,y,sideL);

  if(sideL > 5){
    squareFractal(x-sideL/2, y-sideL/2, sideL/2);
    squareFractal(x-sideL/2, y+sideL/2, sideL/2)
    squareFractal(x+sideL/2, y-sideL/2, sideL/2)
    squareFractal(x+sideL/2, y+sideL/2, sideL/2)
  }
}