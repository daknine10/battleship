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
        this.activePlayer.gameboard.receiveAttack(row, column);
        this.switchTurn();
        if (this.checkWinner()) {
            console.log(`${this.activePlayer.name} wins!`);
            return true;
        }
    }

    checkWinner() {
        if (this.player1.gameboard.checkSunk() || this.player2.gameboard.checkSunk())
            return true
    }

}

class ComputerPlayer {
    constructor(player) {
        
    }
}