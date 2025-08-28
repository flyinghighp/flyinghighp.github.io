// Round racer Assignment
// Priyansh Jhanji
// 17th march 2025

let roundRacerOne; let roundracerTwo; let roundracerThree;


function setup() {
  createCanvas(windowWidth, windowHeight); 
  roundRacerOne = new roundRacer(windowHeight, 'cyan');
  roundracerTwo = new roundRacer(windowHeight/2, 'purple');
  roundracerThree = new roundRacer(windowHeight*0.8, 'gold');
}

function draw() {
  background(0);
  roundRacerOne.display();
  roundRacerOne.move();
  roundracerTwo.display();
  roundracerTwo.move();
  roundracerThree.display();
  roundracerThree.move();
}

class roundRacer{
  constructor(yPos, color){
    this.xPos = 0;
    this.yPos = yPos;
    this.xspeed = random(3,15);
    this.color = color;
  }
  move(){
    this.xPos += this.xspeed;
    if(this.xPos > windowWidth){
      this.xPos = 0;
    }
  }
  display(){
    fill(this.color);
    circle(this.xPos,this.yPos,30);
  }
}