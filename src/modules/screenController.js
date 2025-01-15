import Ship from './ship.js'

export default class ScreenController {
    constructor(game, player1Board, player2Board) {
        this.game = game;
        this.player1Board = player1Board;
        this.player2Board = player2Board;
    }

    updateScreen() {
        if (this.game.checkWinner()) {
            this.player1Board.parentElement.textContent = `${this.game.activePlayer.name} wins!`;
            return;
        }
        this.renderGameboard(this.player1Board, this.game.player1)
        this.renderGameboard(this.player2Board, this.game.player2)
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
                    if (this.game.playRound(i, j))  {
                        boardContainer.parentElement.parentElement.textContent = `${this.game.activePlayer.name} wins!`
                    }
                    this.updateScreen()
                })

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