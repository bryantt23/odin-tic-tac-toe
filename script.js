const GAME_STATUS = {
  DRAW: 'Draw',
  X_WINS: 'X Wins!',
  O_WINS: 'O Wins!',
  NOT_A_DRAW: 'Not a Draw'
};

class Gameboard {
  initialize() {
    this.gameBoardArray = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    this.render();
  }

  getBox(text, i, j) {
    const box = document.createElement('div');
    box.textContent = text;
    box.style.height = '50px';
    box.style.width = '50px';
    box.style.border = '5px solid black';
    box.className = 'box';
    box.dataset.i = i;
    box.dataset.j = j;
    return box;
  }

  render() {
    const gameBoardElement = document.querySelector('.game-board');
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.style.display = 'flex';
      for (let j = 0; j < 3; j++) {
        div.appendChild(this.getBox(this.gameBoardArray[i][j], i, j));
      }
      gameBoardElement.appendChild(div);
    }
  }

  markPosition(i, j, currentPlayerMark) {
    if (this.gameBoardArray[i][j] !== ' ') {
      return false;
    }
    this.gameBoardArray[i][j] = currentPlayerMark;
    this.render();
    return true;
  }

  gameIsADraw() {
    return this.gameBoardArray.flat().every(cell => cell !== ' ');
  }

  checkWinner(playerMark) {
    // Check rows, columns and diagonals
    const lines = [
      ...this.gameBoardArray, // Rows
      ...this.gameBoardArray[0].map((_, colIndex) =>
        this.gameBoardArray.map(row => row[colIndex])
      ), // Columns
      [0, 1, 2].map(index => this.gameBoardArray[index][index]), // Main diagonal
      [0, 1, 2].map(index => this.gameBoardArray[index][2 - index]) // Anti diagonal
    ];

    return lines.some(line => line.every(cell => cell === playerMark));
  }

  isGameOver() {
    if (this.checkWinner('X')) {
      return GAME_STATUS.X_WINS;
    }
    if (this.checkWinner('O')) {
      return GAME_STATUS.O_WINS;
    }
    if (this.gameIsADraw()) {
      return GAME_STATUS.DRAW;
    }
    return GAME_STATUS.NOT_A_DRAW;
  }
}

class GameManager {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.isXTurn = true;
    this.isGameOver = false;
    this.gameInfo = document.querySelector('.game-info');
    this.gameBoardElement = document.querySelector('.game-board');
    this.playerX = document.querySelector('.playerX');
    this.playerO = document.querySelector('.playerO');
  }

  addRestartButton() {
    const button = document.createElement('button');
    button.textContent = 'Start a new game';
    this.gameInfo.appendChild(button);
    button.addEventListener('click', () => {
      this.gameInfo.removeChild(button);
      this.gameBoardElement.classList.remove('disabled');
      this.initialize();
    });
  }

  checkGameStatus() {
    const status = this.gameBoard.isGameOver();
    if (status !== GAME_STATUS.NOT_A_DRAW) {
      this.isGameOver = true;
      let gameOverMessage;
      switch (status) {
        case GAME_STATUS.DRAW:
          gameOverMessage = `${this.playerX.value} tied with ${this.playerO.value}`;
          break;
        case GAME_STATUS.X_WINS:
          gameOverMessage = `${this.playerX.value} defeated ${this.playerO.value}`;
          break;
        case GAME_STATUS.O_WINS:
          gameOverMessage = `${this.playerO.value} defeated ${this.playerX.value}`;
          break;
      }

      const messageDiv = document.createElement('p');
      messageDiv.textContent = gameOverMessage;
      this.gameBoardElement.appendChild(messageDiv);
      this.gameBoardElement.classList.add('disabled');
      this.addRestartButton();
    }
  }

  initialize() {
    this.gameBoard.initialize();
    this.isXTurn = true;
    this.isGameOver = false;
  }

  getCurrentPlayerMark() {
    return this.isXTurn ? 'X' : 'O';
  }

  changePlayer() {
    if (!this.isGameOver) {
      this.isXTurn = !this.isXTurn;
      this.checkGameStatus();
    }
  }
}

// Initialization code
const theGameboard = new Gameboard();
const theGameManager = new GameManager(theGameboard);
theGameManager.initialize();

document.querySelector('.game-board').addEventListener('click', event => {
  if (event.target.classList.contains('box') && !theGameManager.isGameOver) {
    const i = event.target.dataset.i;
    const j = event.target.dataset.j;
    if (
      theGameboard.markPosition(i, j, theGameManager.getCurrentPlayerMark())
    ) {
      theGameManager.changePlayer();
    }
  }
});
