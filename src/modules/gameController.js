//taking turns, making players, computer and human

import Gameboard from "./gameboard"
import Player from "./player"

export default class gameController {
    constructor(player1 = new Player('Player 1', 'real'), player2 = new Player('Computer', 'computer')) {
        this.player1 = player1
        this.player2 = player2
        this.activePlayer = player1
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2: this.player1;
    }

    playRound(row, column) {
        activePlayer.receiveAttack(row, column);
        if (this.checkWinner()) alert(`${this.activePlayer.name} wins!`)
        this.switchTurn()
    }

    checkWinner() {
        if (player1.gameboard.checkSunk() || player2.gameboard.checkSunk())
            return true
    }

}