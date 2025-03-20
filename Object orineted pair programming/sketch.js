// OOP Pair Programming Starter Code
// Priyansh Jhanji, Prodney Hammond
// 20th March 2025

// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;
let bullets = []; // Store bullets

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2, shipImage);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
  
  // Update and display all bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();
    // Remove bullets that are off-screen
    if (!bullets[i].isOnScreen()) {
      bullets.splice(i, 1); // Remove the bullet if it's off-screen
    }
  }
}

function keyPressed() {
  enterprise.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.img = theImage;
  }

  update() {
    // Move the ship based on arrow keys
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
      if (this.y > height) {
        this.y = -height; // Wrap-around effect
      }
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
      if (this.y < -200) {
        this.y = height; // Wrap-around effect
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      if (this.x < -200) {
        this.x = width; // Wrap-around effect
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      if (this.x > width) {
        this.x = -width; // Wrap-around effect
      }
    }
  }

  display() {
    // Display the ship image at its current position
    image(this.img, this.x, this.y);
  }

  handleKeyPress() {
    if (keyCode === 32) { // Spacebar key to fire
      bullets.push(new Bullet(this.x + this.img.width / 2, this.y, bulletImage)); 
    }
  }
}

// ------------------------------------------------------------------------- //

// Bullet Class
class Bullet {
  constructor(x, y, theImage) {
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.speed = 5;
  }

  update() {
    // Move the bullet upwards
    this.y -= this.speed;
  }

  display() {
    // Display the bullet at its current position
    image(this.image, this.x - this.image.width / 2, this.y); // Center the bullet
  }

  isOnScreen() {
    // Check if the bullet is still on the screen
    return this.y > 0;
  }
}
