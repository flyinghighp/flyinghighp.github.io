// Drawing with Shapes Practice
// Priyansh Jhanji
// Feb 10,2025

// Global Variables Declarations

// let boxX = 200 , boxY = 100;
let tSize = 10;
let refX, refY;


function setup() {
  createCanvas(500,500);

}

function draw() {
  background(220);
  // drawBox();
  drawCharacter();
  fill("black"); //fill/stroke can use color strings
  textSize(tSize);
  text(mouseX + "," + mouseY + " " + mouseButton, mouseX, mouseY);
  noStroke();
}

// function drawBox(){
//   //draw box on the screen
//   fill('powderblue');
//   rect(boxX,boxY, 50, 30, 5, 5, 0,0);
//   rect(boxX, boxY - 50, 30);
// }

// function keyPressed(){
//   // //move the box to the right
//   // if(key === "a"){
//   //   boxX = 0;
//   // }
//   // if(key === "d"){
//   //   boxX = 400;
//   // }
//   // if(keyCode === ESCAPE){
//   //   boxY = width*0.85; // 85% down the bottom
//   //   boxX = width*0.6; // 60% down the bottom
//   // }
// }

function drawCharacter(){
  //draw a alien character
  refX= width/2;
  refY= height/2;
  fill ('lightgreen');
  rect(refX-50, refY, 100, 70);
  circle (refX, refY, 100);
  rect(refX-50, refY+70, 20, 40);
  rect(refX+30, refY+70, 20, 40);

  fill('black');
  circle(refX-20, refY, 15);
  circle(refX+20, refY, 15);
  rect(refX-20, refY+20, 40, 10);

  
}