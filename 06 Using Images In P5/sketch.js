// Image Basics
// Priyansh Jhanji
// 26th February 2025

//Globabl Variables
let LionL, LionR;
let pinImages = []; //0-8
let currentFrame = 0;
let facing = "left";

function preload() {
  //function runs and won't and until all file loading is complete
  LionL = loadImage("assets/lion-left.png");
  LionR = loadImage("assets/lion-right.png");

  for (let i = 0; i <= 8; i++) {
    pinImages.push(loadImage("assets/pin-0" + i + ".png"));
  }

  //   {pinImages.push(loadImage("assets/pin-00.png"));
  //   pinImages.push(loadImage("assets/pin-01.png"));
  //   pinImages.push(loadImage("assets/pin-02.png"));
  //   pinImages.push(loadImage("assets/pin-03.png"));
  //   pinImages.push(loadImage("assets/pin-04.png"));
  //   pinImages.push(loadImage("assets/pin-05.png"));
  //   pinImages.push(loadImage("assets/pin-06.png"));
  //   pinImages.push(loadImage("assets/pin-07.png"));
  //   pinImages.push(loadImage("assets/pin-08.png"));
  //   NO NO
  // }

}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // frameRate(8);
}

function draw() {
  background(220);

  //pinwheel code (0-8)
  image(pinImages[currentFrame], width / 2, height / 2);
  if (frameCount % 10 === 0) { //1,2,3,4,5,6,7......99,100,101
    currentFrame++; //advance to the next frame
    if (currentFrame > 8) currentFrame = 0;
  }
  drawLion();


}


function drawLion() {
  // Lion Code
  let sizeX = LionL.width / 2;
  let sizeY = LionL.height / 2;

  //managing the state variable

  if (movedX > 0) facing = "right";
  else if (movedX < 0) facing = "left";

  //interpreting the state variable
  if (facing === "left") {
    image(LionL, mouseX, mouseY, sizeX, sizeY);
  }
  else {
    image(LionR, mouseX, mouseY, sizeX, sizeY);
  }
}
