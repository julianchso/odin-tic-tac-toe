'use strict';

// Setting up the gameboard by using a 2D array.
// A module is used because only one is needed.

const gameboard = (() => {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = '';
    }
  }

  // Set player token in the index of the board
  const setPiece = (row, col, player) => {
    board[row][col] = player.getToken();
  };

  // Get board so that gameController can find index to set token
  const getBoard = () => {
    return { rows, cols, board };
  };

  const printBoard = () => {
    console.log(board);
  };

  return { setPiece, getBoard, printBoard };
})();

// Factory function for players with their token of choice.
// A factory is used because we need multiple.
const player = (token) => {
  const tokenX = document.querySelector('#x');
  const tokenO = document.querySelector('#o');
  let _token = token;

  const getToken = () => _token;

  const setToken = (token, active) => {
    tokenX.addEventListener('click', () => {
      token = 'x';
      tokenX.classList.add('tokenBtnSelected');
      tokenO.classList.remove('tokenBtnSelected');
    });
    tokenO.addEventListener('click', () => {
      token = 'o';
      tokenO.classList.add('tokenBtnSelected');
      tokenX.classList.remove('tokenBtnSelected');
    });
  };

  return { getToken, setToken };
};

// Check for win
const checkWinner = () => {
  const winCombinations = [
    // rows
    [0, 0][(1, 0)][(2, 0)],
    [1, 0][(1, 1)][(1, 2)],
    [2, 0][(2, 1)][(2, 2)],
    // columns
    [0, 0][(1, 0)][(2, 0)],
    [1, 0][(1, 1)][(1, 2)],
    [2, 0][(2, 1)][(2, 2)],
    // diagonals
    [0, 0][(1, 1)][(2, 2)],
    [0, 2][(1, 1)][(2, 0)],
  ];
};

// gameController controls the flow of the game.
// A module is used because only one is needed.

const gameController = (() => {
  const _humanPlayer1 = player('x');
  const _humanPlayer2 = player('o');
  const { rows, cols, board } = gameboard.getBoard();

  console.log(gameboard.getBoard());
  let activePlayer = _humanPlayer1;

  // Set token
  const playRound = (e) => {
    let row = e.target.dataset['row'];
    let col = e.target.dataset['col'];
    // TODO;
    gameboard.setPiece(row, col, activePlayer);
    e.target.textContent = activePlayer.getToken();

    console.log(checkDraw());
    switchPlayer();
  };

  // Check for draw
  const checkDraw = () => {
    // TODO: try using array.every
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  };

  // switch player
  const switchPlayer = () => {
    activePlayer = activePlayer == _humanPlayer1 ? _humanPlayer2 : _humanPlayer1;
  };

  return { playRound };
})();

// Rendering results
// Use the state of the game to render results
// Do not use the visuals on the DOM to control the state.
const displayController = (() => {
  const gameboard = document.querySelector('#gameboard');
  const cells = Array.from(document.querySelectorAll('.cell'));

  cells.forEach((cell) => {
    cell.addEventListener('click', gameController.playRound, { once: true });
  });
})();

const test = player();
console.log(test.setToken());
