// Cars Cars Cars Assignment 03
// Priyansh Jhanji
// 21st March 2025
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class defined.

let eastbound = [];
let westbound = [];
let trafficLight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawRoad();
  // Create a vehicle instance for testing
  eastbound.push(new vehicle());
}

function draw() {
  drawRoad();
  for (let car of eastbound) {
    car.display();
  }
}

// Function to draw the road
function drawRoad() {
  let roadHeight = windowHeight / 2;
  fill(0);
  rect(0, height / 4, windowWidth, roadHeight);  // Road base

  fill('yellow');
  for (let i = 0; i < width; i += 40) {
    rect(i, height / 2, 25, 3);  // Road markings
  }
}

class vehicle {
  //1. Constructor
  constructor(x, y, direction, speed, c) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.type = 0,1; 
    this.changeColor = color(random(255), random(255), random(255));
  }
  // 2. Class Methods
  display() {
    if (this.type === 0) {
      fill(this.changeColor);  

    }
  }
}