let columns = document.getElementsByClassName("column");
let player = 1;
let allCells = document.getElementsByClassName("cell");

for (let i = 0; i < allCells.length; i++) {
  allCells[i].setAttribute("player", 0);
}

for (let i = 0; i < columns.length; i++) {
  columns[i].addEventListener("click", () => {
    clicked(columns[i]);
  });
}

function clicked(column) {
  let cells = column.getElementsByClassName("cell");
  let cellToPaint;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].attributes.checked.value == "false") {
      cellToPaint = cells[i];
    }
  }
  cellToPaint.setAttribute("player", player);
  cellToPaint.setAttribute("checked", "true");
  if (player == 1) {
    player = 2;
  } else {
    player = 1;
  }
  currentPlayer.setAttribute("player", player);
  checkWin(cellToPaint);
}

var gameGrid = [[], [], [], [], [], [], []];
// ## The Grid Of The Game
// ['00', '10', '20', ..]
// ['01', '11', '21', ..]
// ['02', '12', '22', ..]
// ['03', '13', '23', ..]
// ['04', '14', '24', ..]
// ['05', '15', '25', ..]
for (let iColumn = 0; iColumn < columns.length; iColumn++) {
  let columnCells = columns[iColumn].getElementsByClassName("cell");
  for (let iCell = 0; iCell < columnCells.length; iCell++) {
    gameGrid[iColumn][iCell] = columnCells[iCell];
  }
}

function checkWin(current) {
  let currentPlayer = current.attributes.player.value;
  // check vertically
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      isFinal(
        gameGrid[col][row].attributes.player.value,
        gameGrid[col][row + 1].attributes.player.value,
        gameGrid[col][row + 2].attributes.player.value,
        gameGrid[col][row + 3].attributes.player.value,
        currentPlayer
      );
    }
  }
  // check horizontally
  for (let row = 5; row > -1; row--) {
    for (let col = 0; col < 4; col++) {
      isFinal(
        gameGrid[col][row].attributes.player.value,
        gameGrid[col + 1][row].attributes.player.value,
        gameGrid[col + 2][row].attributes.player.value,
        gameGrid[col + 3][row].attributes.player.value,
        currentPlayer
      );
    }
  }
  // diagonals [north-east, south-east, north-west, south-west]
  // check north-east:
  for (let col = 0; col < 4; col++) {
    for (let row = 5; row > 2; row--) {
      isFinal(
        gameGrid[col][row].attributes.player.value,
        gameGrid[col + 1][row - 1].attributes.player.value,
        gameGrid[col + 2][row - 2].attributes.player.value,
        gameGrid[col + 3][row - 3].attributes.player.value,
        currentPlayer
      );
    }
  }
  // Check north-west
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      isFinal(
        gameGrid[col][row].attributes.player.value,
        gameGrid[col + 1][row + 1].attributes.player.value,
        gameGrid[col + 2][row + 2].attributes.player.value,
        gameGrid[col + 3][row + 3].attributes.player.value,
        currentPlayer
      );
    }
  }
  // check south-east
}

function youWon(currentPlayer) {
  console.log(`You Won Player ${currentPlayer}`);
  document.body.setAttribute("finished", "true");
  document.getElementById("winPlayer").innerHTML = currentPlayer;
  if (currentPlayer == 1) {
    document.getElementById("lostPlayer").innerHTML = 2;
  }
  if (currentPlayer == 2) {
    document.getElementById("lostPlayer").innerHTML = 1;
  }
}

function isFinal(a, b, c, d, player) {
  if (a != 0 && a == b && b == c && c == d) {
    console.log("you won form isFinal");
    youWon(player);
  }
}

function playAgain() {
  document.body.setAttribute("finished", "false");
  for (let i = 0; i < columns.length; i++) {
    var cells = columns[i].getElementsByClassName("cell");
    for (let I = 0; I < cells.length; I++) {
      cells[I].setAttribute("checked", "false");
      cells[I].setAttribute("player", "");
    }
  }
}
