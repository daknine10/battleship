import Ship from './ship.js'

let playerTurn = 1

const player1Board = document.querySelector('.player1')
const player2Board = document.querySelector('.player2')

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
                    grid.textContent = "Hit";

                    if (gameboard.checkSunk() && playerTurn === 1) alert("Player 1 Won!")
                    else if (gameboard.checkSunk() && playerTurn === 2) alert ("Player 2 Won!")
                }
                else {
                    grid.textContent = "Miss";
                    let gridChildren = gridBoard.querySelectorAll(".grid");
                    gridChildren.forEach((child) => child.disabled = true)

                    if (playerTurn === 1) {
                        player2Board.querySelectorAll(".grid").forEach((child) => child.disabled = false)
                        playerTurn = 2
                    }
                    else {
                        player1Board.querySelectorAll(".grid").forEach((child) => child.disabled = false)
                        playerTurn = 1
                    }
                }
                grid.disabled = true;
                grid.className = "grid-disabled"
            })

            gridBoard.appendChild(grid);
        }
    }
}