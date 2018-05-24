document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board= {};
  board.cells = [];
  var boardSize = 6;
  var bombNumber = 8;
  makeBoard ()
  getBombs ()

  function makeBoard() {
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        board.cells.push({
          row: i,
          col: j,
          isMine: false,
          hidden: true,
        })
      }
    }
}

function getBombs() {
  for (var i=0; i < bombNumber; i++) {
    placeBombs()
  }
}

  function placeBombs() {
    var randomSquare = 0
    do {
      randomSquare = Math.floor(Math.random() * (boardSize*boardSize))
    } while (board.cells[randomSquare].isMine=false)
    board.cells[randomSquare].isMine = true
  }

function startGame () {
  for (var i=0; i < board.cells.length; i++){
   board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
 }

   document.addEventListener('click', checkForWin)
   document.addEventListener('oncontextmenu', checkForWin)

   lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine) {
      if (!board.cells[i].isMarked)
      return
    } else if (board.cells[i].hidden)
    return
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('Ka Rawe! You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i=0; i < surroundingCells.length; i++) {
  if (surroundingCells[i].isMine == true) count++;
}
  return count;
}

var changeColors = document.getElementsByClassName('board')[0].children.style.color='green';