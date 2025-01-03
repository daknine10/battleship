import Ship from './ship.js'

export default function renderGameboard(boardContainer, gameboard) {
    const gridBoard = document.createElement("div");
    boardContainer.appendChild(gridBoard)
    gridBoard.className = "gameboard";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const grid = document.createElement("button");
            grid.className = "grid";
            grid.dataset.column = j;
            grid.dataset.row = i;
            if (gameboard[i][j] !== null) {
                if (gameboard[i][j] instanceof Ship) grid.textContent = "S"
                else grid.textContent = "X"
            }
            gridBoard.appendChild(grid);
        }
    }
}