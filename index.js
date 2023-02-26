// Setting up the gameboard

const gameboard = function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  // This function is so that the game controller can get the game board.
  const getBoard = () => board;

  // print board to console after every turn.
  // temporary, will not need it after board is rendered to UI.
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };
  return { getBoard, printBoard };
};

// Each cell starts with a value of 0 and can be changed.
function cell() {
  let value = 0;
  const getValue = () => value;
  return {
    getValue,
  };
}

// gameController controls the flow of the game.
function gameController() {
  const board = gameboard();

  const newGame = () => {
    board.printBoard();
  };

  newGame();
}

const game = gameController();

console.log(game);
