// Drawing with Single loops challenge
// Priyansh Jhanji
// Feb 24,2025



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  circleLinetop();
  circleLinebottom();
  circleLineleft();
}
function gradientBackground(){
  //creatw a gradient to use as background
  let h = 1;

  //use a loop to draw vertical stack of rectangles
  for(let y = 0; y < height; y += h){
    noStroke();
    let mappedY = map(y, 0, height, 0, 255);
    let reversedY = map(y, 0, height, 255, 0);
    fill(mappedY, reversedY,mouseX/3);
    rect(0, y, width, h);
  }
}

function circleLinetop(){

  let d = 50;
  let y = 0;
  let xStart = 0;
  let xEnd = width;

  for(let x = xStart; x <= xEnd; x += d*2){

    circle(x, y, d);
  }
}

function circleLinebottom(){

  let d = 50;
  let y = height;
  let xStart = 0;
  let xEnd = width;

  for(let x = xStart; x <= xEnd; x += d*2){

    circle(x, y, d);
  }
}

function circleLineleft(){
  let d = 50;
  let y = 0; 
  let xStart = 0;  
  let xEnd = height/2;

  for(let x = xStart; x <= xEnd; x += d){
    circle(height, y, d);
  }
}