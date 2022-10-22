let currentPlayer = "X";
let board = new Array(9);
let gameover = false;
const title = document.querySelector(".board__title");
const allSquares = document.querySelectorAll(".board__square");

allSquares.forEach((square, index) => {
  square.addEventListener("click", function () {
    gameSquareClick(index);
  });
});

function gameSquareClick(index) {
  const currentGS = allSquares[index];

  if (!gameover && !currentGS.innerHTML) {
    currentGS.innerHTML = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin()) {
      return (title.innerHTML = `${currentPlayer} has won the game!`);
    }

    if (checkDraw()) {
      gameover = true;
      return (title.innerHTML = `Draw!`);
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    title.innerHTML = `${currentPlayer}'s turn`;
  }
}

function checkDraw() {
  return board.filter((elem) => elem).length === 9;
}

function checkWin() {
  const winningCombos = [
    // Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; ++i) {
    const winningCombo = winningCombos[i];

    const symbol1 = board[winningCombo[0]];
    const symbol2 = board[winningCombo[1]];
    const symbol3 = board[winningCombo[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      return (gameover = true);
    }
  }
}

function resetBoard(){
    gameover = false
    title.innerHTML = `${currentPlayer}'s turn`
    allSquares.forEach(square => {
        square.innerHTML = ''
    })
    board = new Array(9)
}
