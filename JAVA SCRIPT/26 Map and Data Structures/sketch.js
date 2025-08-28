// Map and Text Files
// 15 split and spread intax

let textFile,img, rows, cols, grid, colorMap;

function preload(){
  textFile = loadStrings("assets/info.txt");
  img = loadStrings("assets/colorImage.txt")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //processText();
  rows = img.length; cols = img[0].length;

  //create and populate the 2D Array (GRID)
  grid = [];
  for(let i = 0; i < rows; i++){
    grid.push([...img[i]]);
  }

  //create a map of colors
  colorMap = new Map([
    ["b",'black'],
    ["w","white"],
    ["r","sienna"],
    ["l","peru"],
    ["p", color(150,150,255)]
  ]);

  renderGrid();

}

function renderGrid(){
  //calculate rectangle Sizes
  let cellWidth = width/cols;
  let cellHeight = height/rows;

  //visit each spot in 2D array, and visulize
  for(let x = 0; x < cols; x++){
    for(let y =0; y < rows; y++){
      let currentKey = grid[y][x];
      // print(currentKey);
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}
function draw() {
  //background(220);
}

function processText(){  //split() spread syntax
  print("SPLIT INTO WORDS");
  let splitWords = textFile[0].split("");
  print(splitWords);

  print("SPLIT INTO CHARCATERS");
  let splitChars = textFile[1].split("");
  print(splitChars);

  print("SPREAD INTO CHARACTERS");
  let spreadChars = [...textFile[2]];
  print(spreadChars);
}