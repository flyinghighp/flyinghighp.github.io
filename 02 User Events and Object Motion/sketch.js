// User Events 
// Priyansh Jhanji
// February 7, 2025

//Global Variable Declarations
//Define your gloabls here.
//You can only store simple/primitive data
//at this point. (no system varaubles)
let tSize = 10;
let x; //declaration only

function setup() {
  // runs once, right at the start
  createCanvas(500,500);
  x = width/2; //initialization, do in setup()

}

function draw() {
  background(220);

  // print("Current Frame;" + frameCount); //console.log


  // ---------Mouse Section---------
  fill("green"); //fill/stroke can use color strings
  textSize(tSize);
  text(mouseX + "," + mouseY + " " + mouseButton, mouseX, mouseY);

  // ---------Keyboard Section---------
  fill(255,200,100);
  square(x,200,50,5);

  if(keyIsDown(LEFT_ARROW)){
    x = x - 5;
    if (x < 0){ //off left edge
      x = width; //(create a wrap - around effect)
    }
  }
  if(keyIsDown(RIGHT_ARROW)){
    x = x + 5;
    if (x > width){ //off right edge
      x = 0; //(create a wrap - around effect
  }
}
}
function mousePressed(){
  // this is called Automatically...do NOT call it yourself.
  // This is called ONCE PER MOUSE BUTTON PRESS
  tSize = random(5, 100);
}