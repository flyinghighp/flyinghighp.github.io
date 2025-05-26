
let currentPuzzleIndex = 0;


function startPuzzles() {
  currentPuzzleIndex = 0;
  loadNextPuzzle();
}


function loadNextPuzzle() {
  
  pieces = [];
  selectedPiece = null;
  dragging = false;
  gameOver = false;
  winner = null;
  promotionInProgress = false;
  promotionPiece = null;
  promotionButtons = [];
  currentTurn = 'white';

  
  const allPuzzles = [puzzle1];
  if (currentPuzzleIndex >= allPuzzles.length) {
    currentPuzzleIndex = 0;
  }

  
  allPuzzles[currentPuzzleIndex]();
  currentPuzzleIndex++;
}

 
//https://lichess.org/training/mix 
//use this website to create puzzles




