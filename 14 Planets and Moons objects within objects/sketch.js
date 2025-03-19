// 14 Planets and Moons objects within objects
// Priyansh Jhanji
// 19th March 2025
// Sorting objects In Objects, overwriting objects, basic transitions

let myPlanet;
let myMoon;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  myPlanet = new Planet(width / 2, height / 2);
}

function mousePressed(){
  //mouseClicked() → behaves diffrently in certain browsers
  if(keyIsPressed&& keyCode === SHIFT){
    myPlanet = new Planet(mouseX, mouseY);
  }
    else{
      myPlanet.createMoon();
    }
}

function keyPressed(){
  if(key !== SHIFT){
    myPlanet.relocate(mouseX,mouseY);
  }
}

function draw() {
  background(70);
  myPlanet.display();
}

class Planet {
  //1. Constructor
  constructor(x, y) {
    this.x = x; this.y = y; this.s = 100;
    this.moons = [];
  }
  //2. Display
  display() {
    //draw the planet + all the moons
    circle(this.x, this.y, this.s);

    for(let m of this.moons){
      m.update();
    }
  }

  relocate(x,y){
    //First, the planet:
    this.x = x; this.y = y;
    //Then, the moons:
    for(let m of this.moons){
      m.x = x; m.y = y;
    }
  }
  createMoon(){
    this.moons.push(new Moon(this.x, this.y));
  }
}

class Moon{
  constructor(x,y){
    this.x = x; this.y = y; this.speed = random(1,5);
    this.angle = 0; this.orbitRadius = random(80,250); this.s = random(5,50);
  }

  update(){
    //handels all internal class function calss
    this.move();
    this.display();
  }

  move(){
    this.angle += this.speed;
  }

  display(){
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    circle(this.orbitRadius, 0, this.s);
    pop();
  }
  
}