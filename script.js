/*
game engine
    player turn
    while game not over
    start over
    winner/loser message

player
    name
    symbol

gameboard
    array - 3 states empty, x, y
    game over
    render

later - computer
    pick random spots

*/

const gameBoardElement = document.querySelector('.game-board');

gameBoardElement.addEventListener('click', element => {
  theGameboard.markPosition(
    element.target.getAttribute('i'),
    element.target.getAttribute('j'),
    element
  );
  console.log(element.target.textContent);
  console.log(element.target.getAttribute('i'));
  console.log(element.target.getAttribute('j'));
});

function GameManager() {
  let xTurn = true,
    gameOver = false;
  // if (!gameOver) {
  // }

  function initialize() {
    theGameboard.initialize();
  }
  function getCurrentPlayerMark() {
    return xTurn ? 'X' : 'O';
  }
  function changePlayer() {
    xTurn = !xTurn;
  }

  return {
    initialize,
    getCurrentPlayerMark,
    changePlayer
  };
}

function Gameboard() {
  const gameBoardArray = [
    // ['X', ' ', 'O'],
    // [' ', ' ', 'X'],
    // [' ', ' ', ' ']

    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  function initialize() {
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

  function markPosition(i, j, element) {
    if (gameBoardArray[i][j] !== ' ') {
      console.log('already has mark');
      return;
    }

    const playerMark = theGameManager.getCurrentPlayerMark();
    gameBoardArray[i][j] = playerMark;
    element.textContent = playerMark;
    theGameManager.changePlayer();
    render();
  }

  return {
    initialize,
    markPosition
  };
}

const theGameboard = Gameboard(); //TODO make private
const theGameManager = GameManager();
theGameManager.initialize();
