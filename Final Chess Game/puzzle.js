
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


function puzzle1() {
  // White rook gives check to Black king on an otherwise empty board
  pieces.push(new Pieces(1, 0, 'white', 'rook'));   // attacker
  pieces.push(new Pieces(7, 7, 'white', 'king'));   // white king safe
  pieces.push(new Pieces(0, 7, 'black', 'king'));   // target king
}






