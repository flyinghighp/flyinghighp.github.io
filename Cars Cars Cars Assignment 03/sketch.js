// Cars Cars Cars Assignment 03
// Priyansh Jhanji
// 21st March 2025
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class defined.


let eastbound=[];
let westbound=[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i <20; i++){
    eastbound.push(new Vehicle(random(width), random(height / 3, height/3.5), 1, random(2, 5)));
    westbound.push(new Vehicle(random(width), random(height * 0.6, height*0.7), -1, random(2, 5)));
  }
}
function draw() {
  background(220);
  drawRoad();
  for(let car of eastbound){
    car.action();
  }
  for (let car of westbound){
    car.action();
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
    if (this.xSpeed < 0) {
      this.xSpeed = 1;  // Reset speed 
    }
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
    if (this.xSpeed < 15) {
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
      // Car
      rect(this.x, this.y, 50, 25, 5); 
      rect(this.x + 10, this.y - 10, 30, 15, 5); 
      
      // Car windows
      fill('skyblue');
      rect(this.x + 15, this.y - 8, 10, 8, 2);  // Left window
      rect(this.x + 30, this.y - 8, 10, 8, 2);  // Right window
  
      // Wheels
      fill(50);
      circle(this.x + 10, this.y + 25, 10); 
      circle(this.x + 40, this.y + 25, 10);
    } 
    else {
      
      push();
      translate(this.x, this.y);
      if (this.direction === 1) {
        scale(-1, 1);  // Flip horizontally
        translate(-75, 0); // Adjust position after flipping
      }
  
      // Truck Cargo
      fill(this.color);
      rect(15, 0, 60, 30, 5);  
  
      // Truck Cab
      fill(150);
      rect(0, 5, 20, 25, 5);  
  
      // Windshield
      fill('skyblue');
      rect(2, 7, 10, 10); 
  
      // Wheels
      fill(50);
      circle(20, 30, 12);  
      circle(60, 30, 12);
  
      pop();
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