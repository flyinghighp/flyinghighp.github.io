// Interactive Scene Assignment 01
// Priyansh Jhanji
// February 11, 2025
//
let buildingHeight;
let buildingHeight2;
let buildingHeight3;
let buildingHeight4;
let buildingColor;
let buildingColor2;
let buildingColor3;
let buildingColor4;

function setup() {
  createCanvas(800, 800);
  buildingHeight = random(200, 600);
  buildingHeight2 = buildingHeight / 2;
  buildingHeight3 = buildingHeight / 1.5;
  buildingHeight4 = buildingHeight / 4;

  let buildingColors = ['red', 'lightgreen', 'lightgrey', 'yellow', 'pink', 'orange', 'white'];
  buildingColor = random(buildingColors);
  buildingColor2 = random(buildingColors);
  buildingColor3 = random(buildingColors);
  buildingColor4 = random(buildingColors);
}

function draw() {
  background(220);

  sky();
  road();
  sidewalk();
  building();
}

function sky() {
  background(135, 206, 235);
}

function road() {
  fill(0);
  rect(0, height * 0.65, width, height * 0.18);

  fill(255);
  for (let i = 0; i < width; i += 40) {
    rect(i, height * 0.74, 20, 10);
  }
}

function sidewalk() {
  fill(169, 169, 169);
  rect(0, height * 0.83, width, 120);
}

function building() {
  // First building
  fill(buildingColor);
  rect(0, height * 0.65 - buildingHeight, 80, buildingHeight);
  fill(255, 255, 0); // Yellow windows
  if (buildingHeight > 50) {  
    rect(10, height * 0.65 - buildingHeight + 20, 15, 20);
    rect(40, height * 0.65 - buildingHeight + 20, 15, 20);
    rect(10, height * 0.65 - buildingHeight + 50, 15, 20);
    rect(40, height * 0.65 - buildingHeight + 50, 15, 20);
  }

  // Second building
  fill(buildingColor2);
  rect(100, height * 0.65 - buildingHeight2, 100, buildingHeight2);
  fill(255, 255, 0); 
  if (buildingHeight2 > 50) {  
    rect(110, height * 0.65 - buildingHeight2 + 20, 15, 20);
    rect(140, height * 0.65 - buildingHeight2 + 20, 15, 20);
    rect(110, height * 0.65 - buildingHeight2 + 50, 15, 20);
    rect(140, height * 0.65 - buildingHeight2 + 50, 15, 20);
  }

  // Third building
  fill(buildingColor3);
  rect(260, height * 0.65 - buildingHeight3, 134, buildingHeight3);
  fill(255, 255, 0);
  if (buildingHeight3 > 70) { 
    rect(270, height * 0.65 - buildingHeight3 + 20, 15, 20);
    rect(300, height * 0.65 - buildingHeight3 + 20, 15, 20);
    rect(270, height * 0.65 - buildingHeight3 + 50, 15, 20);
    rect(300, height * 0.65 - buildingHeight3 + 50, 15, 20);
  }

  // Fourth building
  fill(buildingColor4);
  rect(420, height * 0.65 - buildingHeight4, 134, buildingHeight4);
  fill(255, 255, 0);
  if (buildingHeight4 > 70) {  
    rect(430, height * 0.65 - buildingHeight4 + 20, 15, 20);
    rect(460, height * 0.65 - buildingHeight4 + 20, 15, 20);
    rect(430, height * 0.65 - buildingHeight4 + 50, 15, 20);
    rect(460, height * 0.65 - buildingHeight4 + 50, 15, 20);
  }
} 

