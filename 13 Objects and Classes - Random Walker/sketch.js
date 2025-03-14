// 13 Objects and Classes - Random Walker
// Priyansh Jhanji
// 14th March 2025
// A first look at working with multiple objects

let singleWalker;
let walkers = [];
const NUM_WALKERS = 2500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  singleWalker = new Walker(100, 150, "green");
  initWalkers();
  noStroke();
  
}

function initWalkers(){
  // create a bunch of walkers objects, put in array
  for(let i = 0; i < NUM_WALKERS; i++){
    let c = color(random(255), random(255), random(255), 99999999);
    let w = new Walker(random(width), random(height), c);
    walkers.push(w);
  }
}
function draw() {
  background(220);
  // singleWalker.move();
  // singleWalker.display();
  // for(let currentWalker of walkers){ //loop by item
  //   //but doesn't let us remove any objects
  //   currentWalker.move();
  //   currentWalker.display();
  // }
  fill(100,50,255,0);
  circle(mouseX, mouseY, 60);

  for(let i = 0; i < walkers.length; i++){ // loop by index
    let w = walkers[i];
    w.move();
    w.display();

    //Ask if the current object is close to the mouse
    if(dist(w.x, w.y, mouseX, mouseY) < 30){
      // to delete  from any arbitary point  in array: splice()
      walkers.splice(i,1);
    }
  }
}

class Walker {
  // 1. Constructor
  constructor(x, y, c) {
    this.x = x; this.y = y; this.c = c;
    this.speed = random(2, 10);
    this.size = 5;
  }

  // 2. Class Mehods
  display() {
    // rectMode(CENTER);
    fill(this.c);
    circle(this.x, this.y, this.size);
  }

  move() {
    // equally  likely chance of  ↑ ↓ → ← (alt24)
    let choice = floor(random(4)); //0, 1, 2, 3
    switch (choice) {
      case 0: //LEFT
        this.x -= this.speed; break;
      case 1: //RIGHT
        this.x += this.speed; break;
      case 2: //UP
        this.y -= this.speed; break;
      case 3: // DOWN
        this.y += this.speed; break
    }
  }
}