import Ship from './ship.js'
import addPlayerListener from './event.js';

export default function renderGameboard(boardContainer, gameboard, playerNum) {
    boardContainer.textContent = "";
    if (boardContainer.parentElement.dataSet = playerNum) {

    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const grid = document.createElement("button");
            grid.className = "grid";
            grid.dataset.column = j;
            grid.dataset.row = i;
            if (gameboard.board[i][j] !== null) {
                if (gameboard.board[i][j] instanceof Ship) grid.textContent = "S" //* remove later, debugging purpose only
                else if  (gameboard.board[i][j] === 1) {
                    grid.textContent ="H";
                    grid.disabled = true;
                }
                else {
                    grid.className = "grid-disabled"
                    grid.disabled = true;
                }
            }     
            boardContainer.appendChild(grid);
        }
    }
    addPlayerListener(boardContainer, gameboard)
}

function addPlayerListener(boardContainer, gameboard) {
    let gridChildren = boardContainer.querySelectorAll(".grid")

    gridChildren.forEach((child) => {
        child.addEventListener("click", () => {
            const column = parseInt(child.dataset.column)
            const row = parseInt(child.dataset.row)

            gameboard.receiveAttack(row, column)
            if (playerTurn === 1) playerTurn = 2
            else playerTurn = 1

            if (gameboard.checkSunk() && playerTurn === 1) alert("Player 1 Won!")
            else if (gameboard.checkSunk() && playerTurn === 2) alert ("Player 2 Won!")

            renderGameboard(boardContainer, gameboard)
        })
    })
}