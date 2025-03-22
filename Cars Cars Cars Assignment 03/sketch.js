// Cars Cars Cars Assignment 03
// Priyansh Jhanji
// 21st March 2025
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class defined.

let eastbound;
let westbound;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawRoad();
  

  eastbound = new Vehicle(random(width), random(height / 3, height/3.5), 1, random(2, 5));
  westbound = new Vehicle(random(width), random(height * 0.6, height*0.7), -1, random(2, 5));
}

function draw() {
  background(220);
  drawRoad();
  eastbound.action();
  westbound.action();
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

class Vehicle {
  constructor(x, y, direction, xSpeed) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.xSpeed = xSpeed; 
    this.type = int(random(2));  // 0 for car, 1 for truck
    this.color = color(random(255), random(255), random(255));
  }
  
  move() {
    this.x += this.xSpeed * this.direction;
    
    //Wrap Around
    if (this.direction === 1 && this.x > width) {
      this.x = -50;
    } 
    else if (this.direction === -1 && this.x < -50) {
      this.x = width;
    }
  }

  speedUp() {
    //Speed Increase
    if (this.xSpeed < 16) {
      this.xSpeed += 1;
    }
  }

  speedDown() {
    //Speed Reduce
    if (this.xSpeed > 0) {
      this.xSpeed -= 1;
    }
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    fill(this.color);
    stroke(0);
    if (this.type === 0) {
      //car
      rect(this.x, this.y, 50, 25, 5); 
      rect(this.x + 10, this.y - 10, 30, 15, 5); 
      fill(50);
      circle(this.x + 10, this.y + 25, 10); 
      circle(this.x + 40, this.y + 25, 10);
    } 
    else {
      //Truck
      rect(this.x, this.y, 55, 25, 5); 
      fill(this.color);
      rect(this.x + 40, this.y, 15, 25); 
    }
  }

  action() {
    this.move();
    if (random(100) < 1) {
      this.speedUp();
    }
    if (random(100) < 1) {
      this.speedDown();
    }
    if (random(100) < 1) {
      this.changeColor();
    }
    this.display();
  }
}
