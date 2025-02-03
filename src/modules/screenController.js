import Ship from './ship.js'

const container = document.querySelector('.container')
const player1Board = document.querySelector('.player1')
const player2Board = document.querySelector('.player2')
const turn = document.querySelector('.turn')


export default class ScreenController {
    constructor(game) {
        this.game = game;
        turn.textContent = `${this.game.activePlayer.name}'s turn`
    }

    updateScreen() {
        turn.textContent = `${this.game.activePlayer.name}'s turn`;
        this.renderGameboard(player1Board, this.game.player2);
        this.renderGameboard(player2Board, this.game.player1);
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

                if (player === this.game.player1) {
                    grid.addEventListener("click", () => this.gridEvent(i, j))
                }

                if (player.gameboard.board[i][j] !== null) {
                    if (player.gameboard.board[i][j] instanceof Ship && boardContainer === player1Board) grid.className = 'ship'
                    else if  (player.gameboard.board[i][j] === 1) {
                        grid.className = "hit";
                        grid.textContent= "X"
                        grid.disabled = true;
                    }
                    else if (player.gameboard.board[i][j] === 0) {
                        grid.className = "miss"
                        grid.textContent = "O"
                        grid.disabled = true;
                    }
                }

                if (player !== this.game.activePlayer) {
                    grid.disabled = true;
                }
                
                boardContainer.appendChild(grid);
            }
        }
    }

    async gridEvent(row, column) {
        if (this.game.playerTurn(row, column)) {
            this.updateScreen()
             if (this.game.checkWinner()) container.textContent = `${this.game.activePlayer.name} wins!`
            return
        }
        player2Board.classList.toggle('transform')
        if (this.game.checkWinner()) container.textContent = `${this.game.activePlayer.name} wins!`

        this.game.switchTurn();
        this.updateScreen();
        player1Board.classList.toggle('transform');

        while (this.game.computerTurn()) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.updateScreen()
            continue;
        }

        if (this.game.checkWinner()) container.textContent = `${this.game.activePlayer.name} wins!`
            
        await new Promise(resolve => setTimeout(resolve, 1000));
        player1Board.classList.toggle('transform');
        this.game.switchTurn()
        this.updateScreen()
        player2Board.classList.toggle('transform')
    }
}

