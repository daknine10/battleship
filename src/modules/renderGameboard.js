import Ship from './ship.js'
import addPlayerListener from './event.js';

export default function renderGameboard(boardContainer, gameboard) {
    boardContainer.textContent = "";

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