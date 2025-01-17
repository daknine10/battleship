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

                grid.addEventListener("click", () => this.gridEvent(i, j))

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

    async gridEvent(row, column) {
        if (this.game.playerTurn(row, column)) {
            this.updateScreen()
            return
        }
        this.updateScreen()
        if (this.game.checkWinner()) alert(`${this.game.activePlayer()}`)

        this.game.switchTurn();
        
        while (this.game.computerTurn()) {
            await new Promise(resolve => setTimeout(resolve, 500));
            this.updateScreen()
            continue;
        }

        if (this.game.checkWinner()) alert(`${this.game.activePlayer()}`)

        await new Promise(resolve => setTimeout(resolve, 500));
        this.game.switchTurn()
        this.updateScreen()
    }
}

