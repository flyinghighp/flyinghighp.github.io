// Create a Fractal Assignment 05
// Priyansh Jhanji
// 16 April 2025
// This code creates a fractal pattern using recursion and 3D transformations. 
function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(255);
  lights();
  
  drawPeacockFeather(0, 0, 100, 5);
}

function drawPeacockFeather(x, y, size, depth) {
  drawEye(x, y, size, depth);
}

function drawEye(x, y, w, depth) {
  if (depth <= 0) return;

  let colors = [
    '#1a1aff', // Blue
    '#007f5f', // Teal Green
    '#ffc300', // Gold
    '#0096c7', // Light Blue
    '#210070'  // Dark Center
  ];

  fill(colors[depth % colors.length]);  
  push();
  translate(x, y);
  scale(1, -1); 
  ellipse(0, 0, w, w * 1.2);  
  pop();

  let newW = w * 0.75;
  let newY = y - 4;
  drawEye(x, newY, newW, depth - 1);
}