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
            if (gameboard.board[i][j] !== null) {
                if (gameboard.board[i][j] instanceof Ship) grid.textContent = "S" //* remove later, debugging purpose only
                else if  (gameboard.board[i][j] === 1) grid.textContent ="H"
                else grid.textContent = "X"
            }

            grid.addEventListener("click", () => {
                if (gameboard.board[i][j] instanceof Ship) {
                    gameboard.receiveAttack(i, j)
                    grid.textContent = "H";
                }
                else {
                    grid.textContent = "M";
                    let gridChildren = gridBoard.querySelectorAll(".grid");
                    gridChildren.forEach((child) => child.disabled = true)
                }
                grid.disabled = true;
            })

            gridBoard.appendChild(grid);
        }
    }
}

function nextTurn(container) {
    document.querySelectorAll
}