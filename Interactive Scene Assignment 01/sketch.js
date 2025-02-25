// Interactive Scene Assignment 01
// Priyansh Jhanji
// February 11, 2025
// This is a dynamic city scene with a moving car, changing sky, and randomly generated buildings.

let skyColors = ['#87ceeb', '#ee5d6c', '#fb9062', '#101c4f'];  
let skyIndex = 0;  
let skyColor = skyColors[skyIndex];
let buildingHeight;
let buildingHeight2;
let buildingHeight3;
let buildingHeight4;
let buildingColor;
let buildingColor2;
let buildingColor3;
let buildingColor4;
let x;

function setup() {
  createCanvas(800, 800);
  buildingHeight = random(200, 560);
  buildingHeight2 = buildingHeight / 2;
  buildingHeight3 = buildingHeight / 1.5;
  buildingHeight4 = buildingHeight / 2.75;

  let buildingColors = ['red', 'lightgreen', 'lightgrey', 'yellow', 'pink', 'orange', 'white'];
  buildingColor = random(buildingColors);
  buildingColor2 = random(buildingColors);
  buildingColor3 = random(buildingColors);
  buildingColor4 = random(buildingColors);

  x = width / 2; 
}

function draw() {
  background(skyColor);  

  road();       
  sidewalk();   
  building();   
  tree();       
  lamp();       
  car();        

  // Car movement based on arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
    if (x < -200) { 
      x = width; // Wrap-around effect
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
    if (x > width) { 
      x = -200; // Wrap-around effect
    }
  }
}

// Function to change sky color using the mouse scroll wheel
function mouseWheel(event) {  
  if (event.deltaY > 100) {  
    skyIndex = (skyIndex + 1) % skyColors.length;  
  } else {  
    skyIndex = (skyIndex - 1 + skyColors.length) % skyColors.length;  
  }  
  skyColor = skyColors[skyIndex];  
}

// Function to draw the road
function road() {
  fill(0);
  rect(0, height * 0.65, width, height * 0.35);  // Road base

  fill(255);
  for (let i = 0; i < width; i += 40) {
    rect(i, height * 0.75, 25, 10);  // Road markings
  }
}

// Function to draw the sidewalk
function sidewalk() {
  fill('yellow');
  rect(0, height * 0.87, width, 10);  // Sidewalk border

  fill('grey');
  rect(0, height * 0.88, width, 150);  // Sidewalk area
}

// Function to draw buildings with randomly generated heights and colors
function building() {
  // First building
  fill(buildingColor);
  rect(0, height * 0.65 - buildingHeight, 80, buildingHeight);

  // Windows
  fill(255, 255, 0); 
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

// Function to draw trees
function tree() {
  // Trunks
  fill('brown');
  rect(600, height * 0.5756, 20, 60);
  rect(700, height * 0.5756, 20, 60);

  // Leaves clusters
  fill('green');
  circle(610, height * 0.55, 70);
  circle(595, height * 0.55, 70);
  circle(630, height * 0.55, 70);
  circle(610, height * 0.51, 70);

  circle(710, height * 0.55, 70);
  circle(695, height * 0.55, 70);
  circle(730, height * 0.55, 70);
  circle(710, height * 0.51, 70);
}

// Function to draw street lamps
function lamp() {
  // First lamp
  fill('black');
  rect(80, height * 0.89, 10, 100);
  rect(45, height * 0.89, 80, 10);
  fill('white');
  circle(45, height * 0.9, 20);
  circle(120, height * 0.9, 20);

  // Second lamp
  fill('black');
  rect(530, height * 0.89, 10, 100);
  rect(495, height * 0.89, 80, 10);
  fill('white');
  circle(495, height * 0.9, 20);
  circle(570, height * 0.9, 20);
}

// Function to draw a car that moves left and right
function car() {
  fill('red');
  rect(x, height * 0.75, 200, 40, 10);  // Car body
  noStroke();
  rect(x + 30, height * 0.75 - 20, 140, 40, 10); // Car roof
  
  //Wheels
  stroke(1);
  fill('grey');
  circle(x + 30, height * 0.75 + 40, 25);  
  circle(x + 170, height * 0.75 + 40, 25); 

  fill('white');
  circle(x + 30, height * 0.75 + 40, 15);
  circle(x + 170, height * 0.75 + 40, 15);

  fill('yellow');
  ellipse(x + 190, height * 0.75 + 10, 15, 10);  // Headlight
}
