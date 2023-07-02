let columns = document.getElementsByClassName("column");
let player = 1;

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
  // in order to check successfully you have to do the following:
  //   for the right or left check:
  //      get the last piece in teh right or the left order and from it check for 3 to the right and 3 to the left (if could specify in which order the piece you pur was placed chose in that direction)
  //      Example: "1", "1", "0", "1";
  //      If the player chose the 0 sport the current algorithms won't be able to detect this win and you should work with the upper one to do it correctly.
  let currentPlayer = current.attributes.player.value;
  let col = gameGrid.findIndex((arr) => arr.includes(current));
  let row = gameGrid[col].indexOf(current);
  let gridCol = gameGrid[col];
  let piecesInRow = 1;
  // will make 7 checks (right, left, bottom, bottom-right, bottom-left, top-right, top-left)
  // check bottom
  for (let currentRow = row + 1; currentRow < row + 4; currentRow++) {
    console.log("%cthe bottom check", "color: green; font-size: 16px;");
    if (gridCol[currentRow]) {
      if (gridCol[currentRow].attributes.player.value == currentPlayer) {
        piecesInRow++;
      } else {
        // console.log("doesn't have 3 other pieces in bottom");
        piecesInRow = 1;
        // break;
      }
      if (piecesInRow == 4) {
        youWon(currentPlayer);
        console.log(piecesInRow);
        console.log(
          `currentRow: ${currentRow}, gridCol: ${gridCol}, won from bottom`
        );
      }
    } else {
      // break;
      piecesInRow = 1;
    }
  }
  // Check Right
  for (let currentCol = col + 1; currentCol < col + 4; currentCol++) {
    console.log("%cthe right check", "color: blue; font-size: 16px;");
    if (gameGrid[currentCol]) {
      if (gameGrid[currentCol][row].attributes.player.value == currentPlayer) {
        piecesInRow++;
      } else {
        piecesInRow = 1;
        // break;
      }
      if (piecesInRow == 4) {
        youWon(currentPlayer);
        console.log(
          `currentCol: ${currentCol}, row: ${row}, won from right, piecesInRow: ${piecesInRow}`
        );
      }
    } else {
      // break;
      piecesInRow = 1;
    }
  }
  // Check Left
  for (let currentCol = col - 1; currentCol > col - 4; currentCol--) {
    console.log("%cthe left check", "color: red; font-size: 16px;");
    // console.log(`currentCol: ${currentCol}, the col is: ${col}`);
    if (gameGrid[currentCol]) {
      // console.log(gameGrid[currentCol]);
      if (gameGrid[currentCol][row].attributes.player.value == currentPlayer) {
        piecesInRow++;
      } else {
        piecesInRow = 1;
        // break;
      }
      if (piecesInRow == 4) {
        youWon(currentPlayer);
        console.log(
          `currentCol: ${currentCol}, row: ${row}, won from left, piecesInRow: ${piecesInRow}`
        );
      }
    } else {
      // break;
      piecesInRow = 1;
    }
  }
}

function youWon(currentPlayer) {
  console.log(`You Won Playerl ${currentPlayer}`);
  document.body.setAttribute("finished", "true");
  document.getElementById("winPlayer").innerHTML = currentPlayer;
  if (currentPlayer == 1) {
    document.getElementById("lostPlayer").innerHTML = 2;
  }
  if (currentPlayer == 2) {
    document.getElementById("lostPlayer").innerHTML = 1;
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
