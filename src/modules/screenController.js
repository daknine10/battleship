import Ship from './ship.js'
const player1Board = document.querySelector('.player1')
const player2Board = document.querySelector('.player2')
const turn = document.querySelector('.turn')

export default class ScreenController {
    constructor(game) {
        this.game = game;
    }

    updateScreen() {
        this.renderGameboard(player1Board, this.game.player2)
        this.renderGameboard(player2Board, this.game.player1)
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
                    if (this.game.playerTurn(i, j)) {
                        this.updateScreen()
                        return
                    }
                    if (this.game.checkWinner()) alert(`${this.game.activePlayer()}`)
                    this.game.switchTurn();
                    
                    this.computerMove()

                    if (this.game.checkWinner()) alert(`${this.game.activePlayer()}`)
                    this.updateScreen(); //NEED TO MAKE THIS AN ASYNC FUNCTION
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

                if (this.game.activePlayer !== this.game.player1) {
                    grid.disabled = true;
                }
                
                boardContainer.appendChild(grid);
            }
        }
    }

    async computerMove() {

        while (this.game.computerTurn()) {
            await setTimeout(() => {this.updateScreen()}, 500)
            continue;
        }
        this.game.switchTurn()
    }
}
