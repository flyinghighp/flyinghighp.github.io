// State Variables and Time Delays
// Priyansh Jhanji
// 13th February 2025
// State Variables, Switch, Fames/Time

//Global Variable Declaration
let shapeState = 1;   // 1- Circle, 2- Square, 3- Triangle, 4- Tranzition
let startTime, elapsedTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis(); //should roughly 0
}

function manageTimer(){
  //update elsapsedTime variable
  //and display
  elapsedTime = millis() - startTime;
  text(elapsedTime, width*0.1, height*0.75);
}

function drawShape() {
  switch(shapeState) {
  case 1:
    circle(width/2, height/2, 150);
    break;
  case 2:
    square(width/2, height/2, 150);
    break;
  case 3:
    let x = width/2;  let y = height/2;
    triangle(x-50, y+50, x+50, y-50, x, y-25);
    break;
  case 4:
    for(let i=0; i< 20; i++) {
      let x = random(width*0.4, width*0.6); 
      let y = random(height*0.4, height*0.6);
      line(x, y, x+25, y);
    }
    break;
  }
}

function keyPressed() {
  //on each keypress, let's advance the state
  //variable 1+2 2+3 3+4 (for 2 seconds)-> 1
  if (shapeState < 4) {
    shapeState++;
  }
  if(shapeState === 4) {
    startTime = millis();
  }  
}
function draw() {
  background(220);
  drawShape();
  manageTimer();
  if(shapeState === 4 && elapsedTime > 1) {
    shapeState = 1;
  }   
}   