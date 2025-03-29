// Cars Cars Cars Assignment 03
// Priyansh Jhanji
// 21st March 2025
// Creating a Traffic Simulation where each vehicle on the road will be an object created from a Vehicle class defined.

// Global Variables
let eastbound = []; 
let westbound = []; 
let trafficLight; 
let redStartFrame = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i <= 20; i++) { // Loop to create 20 vehicles on both sides of the road
    eastbound.push(new Vehicle(random(width), random(height / 2 - 40, height / 3.6), 1, random(2, 5))); // Create vehicles on the upper side of the road
    westbound.push(new Vehicle(random(width), random(height * 0.55, height * 0.7), -1, random(2, 5))); // Create vehicles on the bottom side of the road
  }
  trafficLight = new TrafficLight(width / 1.35, height / 5 - 30); // Create a traffic light on the road
}

function draw() {
  background(220);
  drawRoad(); // Draw the road
  trafficLight.display(); // Display the traffic light
  trafficLight.update(); // Update the traffic light state
  
  // Move cars only if the light is green
  if (trafficLight.lightcolor === 'green') {
    for (let car of eastbound) {
      car.action();
    }
    for (let car of westbound) {
      car.action();
    }
  } 
  else {
    for (let car of eastbound) {
      car.display(); // Display cars without movement when the light is red
    }
    for (let car of westbound) {
      car.display();
    }
  }
}

function mousePressed() {
  if (keyIsDown(SHIFT)) {
    // Add a westbound car on Shift+left click
    westbound.push(new Vehicle(random(width), random(height * 0.55, height * 0.7), -1, random(2, 5)));
  } 
  else {
    // Add an eastbound car on left click
    eastbound.push(new Vehicle(random(width), random(height / 2 - 40, height / 3.6), 1, random(2, 5)));
  }
}

function keyPressed() {
  if (keyCode === 32) { // Spacebar turns the light red
    trafficLight.turnRed();
  }
}

// Function to draw the road with lane markings
function drawRoad() {
  let roadHeight = windowHeight / 2;
  fill(0);
  rect(0, height / 4, windowWidth, roadHeight); // Road base

  fill('yellow');
  for (let i = 0; i < width; i += 40) {
    rect(i, height / 2, 25, 3); // Road markings
  }
}

class TrafficLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lightcolor = 'green'; // Initial state is green
  }

  display() {
    fill(30);
    rect(this.x - 15, this.y - 30, 30, 70, 5); // Traffic light post
    fill ('yellow');
    rect(this.x - 7.5, this.y + 39, 15, 38, 2,2 ); // Light box
    fill(this.lightcolor);
    circle(this.x, this.y, 25); // Display the current light color
  }

  update() {
    // Change back to green after 120 frames if red
    if (this.lightcolor === 'red' && frameCount - redStartFrame > 120) {
      this.lightcolor = 'green';
    }
  }

  turnRed() {
    // Turn red only if it's currently green
    if (this.lightcolor === 'green') {
      this.lightcolor = 'red';
      redStartFrame = frameCount; // Store the frame count when turning red
    }
  }
}

class Vehicle {
  constructor(x, y, direction, xSpeed) {
    this.x = x;
    this.y = y;
    this.direction = direction; // 1 for eastbound, -1 for westbound
    this.xSpeed = xSpeed;
    this.type = int(random(2)); // 0 for car, 1 for truck
    this.color = color(random(255), random(255), random(255)); // Assign a random color
  }

  move() {
    if (this.xSpeed < 0) {
      this.xSpeed = 1; // Reset speed
    }

    this.x += this.xSpeed * this.direction;

    // Wrap around 
    if (this.direction === 1 && this.x > width) {
      this.x = -50;
    } 
    else if (this.direction === -1 && this.x < -50) {
      this.x = width;
    }
  }

  speedUp() {
    if (this.xSpeed < 15) {
      this.xSpeed += 1; // Increase speed if below max
    }
  }

  speedDown() {
    if (this.xSpeed > 1) {
      this.xSpeed -= 1; // Decrease speed if above zero
    }
    
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255)); // Randomize vehicle color
  }

  display() {
    fill(this.color);
    stroke(0);

    if (this.type === 0) {
      // Car drawing
      push();
      translate(this.x, this.y);
      if (this.direction === -1) {
        scale(-1, 1); // Flip horizontally for westbound cars
      }
      rect(0, 0, 50, 25, 5);
      rect(10, -10, 30, 15, 5);

      // Car windows
      fill('skyblue');
      rect(15, -8, 10, 8, 2);
      rect(30, -8, 10, 8, 2);

      // Wheels
      fill(50);
      circle(10, 25, 10);
      circle(40, 25, 10);
      pop();
    } 
    else {
      // Truck drawing
      push();
      translate(this.x, this.y);
      if (this.direction === 1) {
        scale(-1, 1); // Flip for eastbound trucks
        translate(-75, 0);
      }

      // Truck cargo and cab
      fill(this.color);
      rect(15, 0, 60, 30, 5);
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
    this.move(); // Move the vehicle
    if (random(100) < 1) {
      this.speedUp(); // Occasionally speed up
    }
    if (random(100) < 1) {
      this.speedDown(); // Occasionally slow down
    }
    if (random(100) < 1) {
      this.changeColor(); // Occasionally change color
    }
    this.display(); // Display the vehicle
  }
}
