/*
2D Array Practice.
Complete the following tasks:

1. Create an empty array named numbers

2. Add the following 3 arrays (using push()) into numbers:
    [10,20,30]
    [5, 5, 5]
    [97, 98, 99]

3. Print out your 2D array

4. Add an extra 99 to the end of each interior array

5. Change the item a [0][2] to 300

6. Loop through each item in the 2D array.
    for any values that are greater than 90, reduce their value by 50

7. change all the values in the inner array at position 1 to 0
    - could look at using .fill()

*/

let numbers = [];
function setup() {
  createCanvas(400, 400);
  
  
  numbers.push([10,20,30]);
  numbers.push([5, 5, 5]);
  numbers.push([97, 98, 99]);
  
  // print(numbers); 
  numbers[0].push(99);
  numbers[1].push(99);
  numbers[2].push(99);
  numbers[0][2] = 300;
  
  for(let arrayIndex = 0; arrayIndex < numbers.length; arrayIndex++){
    for(let itemIndex  =0; itemIndex < numbers[0].length;itemIndex ++){
      if(numbers[arrayIndex][itemIndex] > 90){
        numbers[arrayIndex][itemIndex] -= 50;
      }
    }
  }
  print(numbers);
  
  
  numbers[1].fill(0); //Step 7
}

