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
const initialGame = [
  ['X', '_', 'O'],
  ['_', '_', 'X'],
  ['_', '_', '_']
];
function Gameboard() {
  function initialize() {
    gameBoardElement.appendChild(box);
  }

  function getBox() {
    const box = document.createElement('div');
    box.style.height = '50px';
    box.style.width = '50px';
    box.style.border = '5px solid black';
    return box;
  }

  // get 3 boxes in the same row
  function render() {
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.style.display = 'flex';
      for (let j = 0; j < 3; j++) {
        div.appendChild(getBox());
      }
      gameBoardElement.appendChild(div);
    }
  }

  return {
    initialize,
    render
  };
}

const theGameboard = Gameboard();
function initialize() {
  theGameboard.render();
}

initialize();
