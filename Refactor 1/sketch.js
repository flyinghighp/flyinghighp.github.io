// Refactor 1 Practice
// Priyansh Jhanji
// 11th March 2025
// Bouncing rectangle

let x, y, speedX, speedY; // Global variables

function setup() { // Initial setup
    createCanvas(windowWidth, windowHeight);
    x = 200; 
    y = 300; 
    speedX = random(3, 8); 
    speedY = random(3, 8);
}

function draw() { // Draw function
    wallBounce();
    background(80, 80, 80);
    rect(x, y, 250, 75);
}

function wallBounce() {
    // Update the position
    x += speedX; 
    y += speedY;

    // Check for collision with the top or bottom boundary and reverse the vertical direction
    if (y >= height - 75 || y <= 0) {
        speedY = speedY * -1;
    }

    // Check for collision with the left or right boundary and reverse the horizontal direction
    if (x >= width - 250 || x <= 0) {
        speedX = speedX * -1;
    }
}