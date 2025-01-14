//taking turns, making players, computer and human

import Player from "./player"

export default class GameController {
    constructor(player1 = new Player('Player 1'), player2 = new Player('Computer')) {
        this.player1 = player1
        this.player2 = player2
        this.activePlayer = player1
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2: this.player1;
    }

    playRound(row, column) {
        if (this.activePlayer.gameboard.receiveAttack(row, column)) {
            return
        }
        this.switchTurn();
        if (this.activePlayer.name === 'Computer') this.computerTurn()
        if (this.checkWinner()) {
            console.log(`${this.activePlayer.name} wins!`);
            return true;
        }
    }

    checkWinner() {
        if (this.player1.gameboard.checkSunk() || this.player2.gameboard.checkSunk())
            return true
    }


    computerTurn() {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10)
        while (this.activePlayer.gameboard.receiveAttack(row, column)) {
            let q = []
            console.log(q)
            q.push([row - 1, column], [row, column - 1], [row, column + 1], [row + 1, column])


            let coordinates = q.pop()

            row = coordinates[0]
            column = coordinates[1]
        };
        this.switchTurn();
    }
}