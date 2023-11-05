const GAME_STATUS = {
  DRAW: 'Draw',
  X_WINS: 'X Wins!',
  O_WINS: 'O Wins!',
  NOT_A_DRAW: 'Not a Draw'
};

const gameBoardElement = document.querySelector('.game-board');
const gameInfo = document.querySelector('.game-info');

gameBoardElement.addEventListener('click', element => {
  if (element.target.classList.contains('box')) {
    theGameboard.markPosition(
      element.target.getAttribute('i'),
      element.target.getAttribute('j')
    );
  }
});

function GameManager() {
  let isXTurn = true,
    isGameOver = false;

  function addRestartButton() {
    const button = document.createElement('button');
    button.textContent = 'Start a new game';
    gameInfo.appendChild(button);
    button.addEventListener('click', () => {
      gameInfo.removeChild(button);
      gameBoardElement.classList.remove('disabled');
      initialize();
    });
  }

  function checkGameStatus() {
    isGameOver = theGameboard.isGameOver();
    let gameOverMessage;
    let playerX = document.querySelector('.playerX'),
      playerO = document.querySelector('.playerO');
    switch (isGameOver) {
      case GAME_STATUS.DRAW:
        gameOverMessage = `${playerX.value} tied with ${playerO.value}`;
        break;
      case GAME_STATUS.X_WINS:
        gameOverMessage = `${playerX.value} defeated ${playerO.value}`;
        break;
      case GAME_STATUS.O_WINS:
        gameOverMessage = `${playerO.value} defeated ${playerX.value}`;
        break;
      default:
        return;
    }

    const messageDiv = document.createElement('p');
    messageDiv.textContent = gameOverMessage;
    gameBoardElement.appendChild(messageDiv);
    gameBoardElement.classList.add('disabled');
    addRestartButton();
  }

  function initialize() {
    theGameboard.initialize();
    isXTurn = true;
    isGameOver = false;
  }
  function getCurrentPlayerMark() {
    return isXTurn ? 'X' : 'O';
  }
  function changePlayer() {
    isXTurn = !isXTurn;
    checkGameStatus();
  }

  return {
    initialize,
    getCurrentPlayerMark,
    changePlayer
  };
}

const emptyGameBoard = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];
const filledGameBoard = [
  ['X', ' ', ' '],
  ['O', ' ', 'O'],
  ['X', ' ', ' ']
];

function Gameboard() {
  let gameBoardArray;

  function initialize() {
    gameBoardArray = JSON.parse(JSON.stringify(emptyGameBoard));
    render();
  }

  function getBox(text, i, j) {
    const box = document.createElement('div');
    box.textContent = text;
    box.style.height = '50px';
    box.style.width = '50px';
    box.style.border = '5px solid black';
    box.className = 'box';
    box.setAttribute('i', i);
    box.setAttribute('j', j);
    return box;
  }

  // get 3 boxes in the same row
  function render() {
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.style.display = 'flex';
      for (let j = 0; j < 3; j++) {
        div.appendChild(getBox(gameBoardArray[i][j], i, j));
      }
      gameBoardElement.appendChild(div);
    }
  }

  function markPosition(i, j) {
    if (gameBoardArray[i][j] !== ' ') {
      return;
    }

    const playerMark = theGameManager.getCurrentPlayerMark();
    gameBoardArray[i][j] = playerMark;
    render();
    theGameManager.changePlayer();
  }

  function gameIsADraw() {
    let markCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoardArray[i][j] != ' ') {
          markCount++;
        }
      }
    }

    return markCount === 9 ? GAME_STATUS.DRAW : GAME_STATUS.NOT_A_DRAW;
  }

  function isGameOver() {
    return (
      horizontalWinner() ||
      verticalWinner() ||
      diagonalWinner() ||
      gameIsADraw()
    );
  }

  function diagonalWinner() {
    let ct = 0;
    for (let i = 0; i < 3; i++) {
      if (gameBoardArray[i][i] === 'X') {
        ct++;
      }
      if (gameBoardArray[i][i] === 'O') {
        ct--;
      }
    }

    if (ct === 3) {
      return GAME_STATUS.X_WINS;
    }
    if (ct === -3) {
      return GAME_STATUS.O_WINS;
    }

    ct = 0;
    for (let i = 2; i >= 0; i--) {
      if (gameBoardArray[2 - i][i] === 'X') {
        ct++;
      }
      if (gameBoardArray[2 - i][i] === 'O') {
        ct--;
      }
    }
    if (ct === 3) {
      return GAME_STATUS.X_WINS;
    }
    if (ct === -3) {
      return GAME_STATUS.O_WINS;
    }
    return null;
  }

  function verticalWinner() {
    for (let j = 0; j < 3; j++) {
      let ct = 0;
      for (let i = 0; i < 3; i++) {
        if (gameBoardArray[i][j] === 'X') {
          ct++;
        }
        if (gameBoardArray[i][j] === 'O') {
          ct--;
        }
      }
      if (ct === 3) {
        return GAME_STATUS.X_WINS;
      }
      if (ct === -3) {
        return GAME_STATUS.O_WINS;
      }
    }
    return null;
  }

  function horizontalWinner() {
    for (let i = 0; i < 3; i++) {
      let ct = 0;
      for (let j = 0; j < 3; j++) {
        if (gameBoardArray[i][j] === 'X') {
          ct++;
        }
        if (gameBoardArray[i][j] === 'O') {
          ct--;
        }
      }
      if (ct === 3) {
        return GAME_STATUS.X_WINS;
      }
      if (ct === -3) {
        return GAME_STATUS.O_WINS;
      }
    }
    return null;
  }

  return {
    initialize,
    markPosition,
    isGameOver
  };
}

const theGameboard = Gameboard();
const theGameManager = GameManager();
theGameManager.initialize();
