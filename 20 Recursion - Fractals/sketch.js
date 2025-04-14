// 20 Recursion - Fractals
// priyansh Jhanji
// 14th April 2025
// cantor set, Circle Fractal, RectangleFractal





function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // reCircle(width/2, height/2, width);
  // cantor(width*0.1, height*0.3, width*0.8, 9);
  circleFractal(width/2, height/2, height*0.8);
  
}

function circleFractal(x,y,d){
  noFill();
  if(d>1){
    circle(x,y,d);
    //recursive call
    circleFractal(x-d/2,y,d/2);
    circleFractal(x+d/2,y,d/2);
    circleFractal(x,y-d/2,d/2);
    
  }
  
   // recursive call to left
  // implicit base case - dont recurse if diameter is small
}

// function cantor(x,y,len, depth){
//   if(depth > 1){
//     line(x,y, x+len, y);
//     y +=20;

//     cantor(x,y,len/3,depth-1); // left third
//     cantor(x+len*2/3,y,len/3,depth-1); // right third
//   }

// }




// function reCircle(x,y,d){
//   //recursively draw circles as  long as diamaeter > 5

//   circle(x,y,d);
//   if (d >= 10);{ //Recursive Call
//     reCircle(x,y,d*0.9);
//   }
//   //Implicit base case (if d <10)
//}