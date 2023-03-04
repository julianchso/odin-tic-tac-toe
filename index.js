'use strict';

// Setting up the gameboard by using a 2D array.
// A module is used because only one is needed.

const gameboard = (() => {
  const row = 3;
  const col = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i][j] = '';
    }
  }

  const setPiece = (row, col, player) => {
    board[row][col] = player.getToken(player);
  };

  return { setPiece };
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
})();

// Rendering results
// Use the state of the game to render results
// Do not use the visuals on the DOM to control the state.
function displayController() {
  const gameboard = document.querySelector('#gameboard');
  const cells = Array.from(document.querySelectorAll('.cell'));

  console.log(cells);
  cells.forEach((cell) => {
    cell.addEventListener('click', playRound);
  });
}

const playRound = (e) => {
  console.log(e.target);
  e.target.textContent = 'x';
};

displayController();
// const test = player();
// test.setToken();
