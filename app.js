const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
let current = players[0];


for (let cell of cells) {
  cell.addEventListener("click", handleCellClick, { once: true });
}

function handleCellClick(event) {

  event.target.textContent = current;

  if (checkWin(current)) {
    msg.textContent = `${current} wins the game!`;
    for (let cell of cells) {
      cell.removeEventListener("click", handleCellClick);
    }
    return;
  } else if (checkTie()) {
    msg.textContent = "It's a tie!";
    return;
  }

  if(current===players[0]){
    current=players[1]
  }
  else{
    current=players[0]
  }
  msg.textContent = `${current}'s turn!`;
}


function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    if (combination.every(index => cells[index].textContent === player)) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return true;
}


function restart() {
  for (let cell of cells) {
    cell.textContent = "";
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  }
  current = players[0];
  msg.textContent = `${current}'s turn!`;
}
