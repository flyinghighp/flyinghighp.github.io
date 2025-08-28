// 08 Warm-up arrays and loops
// Priyansh Jhanji
// 3rd March 2025
//1. Summing an array
//2. Drawing with loops practice

let a=[22,11,5,5,90,80,70,60];
//     0   1  2 3 4 5   6  7
// a.length is 8

function setup() {
  createCanvas(400, 400);
  background(200);
  // TASK 1: Add up all the valuses in our array and display the total in the console
  let total = 0;

  for (let currentNumber of a){
    total += currentNumber;
  }
  // let i = 0;
  // let sum = 0;
  // for (let i = 0; i < a.length; i++) {
  //   sum += a[i];
  // }
  // console.log(sum);
  print(total);
}

function draw() {
  makeCircles();
}

function makeCircles(){
  for(let x = 0; x<= width; x+= width/10){
    circle(x,x,20);
    circle(x,400-x,20);
  }
}