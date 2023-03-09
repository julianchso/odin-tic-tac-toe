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

// gameController controls the flow of the game.
// A module is used because only one is needed.

const gameController = (() => {
  const _humanPlayer1 = player('x');
  const _humanPlayer2 = player('o');
  const { rows, cols, board } = gameboard.getBoard();
  const message = document.querySelector('#message');

  console.log(gameboard.getBoard());
  let activePlayer = _humanPlayer1;

  // Set token
  const playRound = (e) => {
    let row = e.target.dataset['row'];
    let col = e.target.dataset['col'];
    // TODO;
    gameboard.setPiece(row, col, activePlayer);
    e.target.textContent = activePlayer.getToken();

    if (checkDraw()) {
      message.textContent = 'Draw!';
      console.log('Draw!');
    } else {
      switchPlayer();
    }
  };

  // Check for win
  const checkWinner = () => {
    const equalsThree = (a == b, b == c);
    const winner = null;

    // check rows
    for (let i = 0; i < cols; i++) {
      if ((board[i][0] == board[i][1]) == board[i][2]) {
        winner = board[i][0];
      }
    }

    // check columns
    for (let i = 0; i < rows; i++) {
      if ((board[0][i] == board[1][i]) == board[2][i]) {
        winner = board[0][i];
      }
    }

    // check diagonal
    if ((board[0][0] == board[1][1]) == board[2][2]) {
      winner = board[0][0];
    } else if ((board[0][2] == board[1][1]) == board[2][0]) {
      winner = board[0][2];
    }
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

  return { playRound, checkDraw };
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
