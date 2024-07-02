const playButton = document.querySelector('.play');
const gameBoardContainer = document.querySelector('main');
const form = document.querySelector('form');
const username1 = document.querySelector('#username1');
const username2 = document.querySelector('#username2');
const body = document.querySelector('body');
const title = document.querySelector('.title');

const gameBoardCells = 9;

document.addEventListener('DOMContentLoaded', () => {
    username1.value = "";
    username2.value = "";
})

playButton.addEventListener('click', () => {
    if(username1.value.length > 0 && username2.value.length > 0){
        gameBoardContainer.removeChild(form);
        createGameBoard();
    }
});

function createGameBoard(){
    title.style.display = "block";
    const button = document.createElement('button');
    button.textContent = "Restart";
    button.style.gridColumn = "1 / -1";
    button.style.padding = "10px 5px";
    gameBoardContainer.classList.add('game-board');
    for(let i = 0; i < gameBoardCells; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.display = "flex";
        cell.style.justifyContent = "center";
        cell.style.alignItems = "center";
        cell.style.cursor = "pointer";
        gameBoardContainer.appendChild(cell)
    }
    gameBoardContainer.appendChild(button);
}
