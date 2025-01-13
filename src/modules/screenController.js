import Ship from './ship.js'

export default class ScreenController {
    constructor(game) {
        this.game = game
    }

    renderGameboard(boardContainer, player) {
        boardContainer.textContent = "";
        boardContainer.dataset.player = player.name
    
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const grid = document.createElement("button");
                grid.className = "grid";
                grid.dataset.column = j;
                grid.dataset.row = i;
                grid.addEventListener("click", () => {
                    this.game.playRound(i, j)
                    this.renderGameboard()
                }) /// THIS HAS TO BE CHANGED INTO ITS OWN FUNCTION
                if (player.gameboard.board[i][j] !== null) {
                    if (player.gameboard.board[i][j] instanceof Ship) grid.textContent = "S" //* remove later, debugging purpose only
                    else if  (player.gameboard.board[i][j] === 1) {
                        grid.textContent ="X";
                        grid.disabled = true;
                    }
                    else {
                        grid.className = "grid-disabled"
                        grid.disabled = true;
                    }
                }
                if (this.game.activePlayer !== player) {
                    grid.disabled = true;
                }     
                boardContainer.appendChild(grid);
            }
        }
    }
}