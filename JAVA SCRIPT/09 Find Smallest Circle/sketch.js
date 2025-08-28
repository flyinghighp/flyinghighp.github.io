// 09 Find Smallest Circle
// Priyansh Jhanji
// 5th March 2025

const NUM_CIRCLES = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawCircles();
}

function draw() {
  //background(220);
  
}

function drawCircles(){
  // draw NUM_CIRCLES circles with no fill
  // the smallest one will be filled with a color
  let smallestDiameter = Infinity;
  let smallX, smallY;
  
  
  noFill();
  for( let i = 0; i < NUM_CIRCLES; i++){
    //generates the next circle
    let x = random(width);
    let y = random(height);
    let d = random(20, 80);
    
    circle(x, y, d);
  
    //"is this the smallest circle so far?"
    if (d < smallestDiameter){
      smallestDiameter = d;
      smallX = x;
      smallY = y;
    }
  }
  
  fill('yellow');
  circle(smallX, smallY, smallestDiameter);
}
