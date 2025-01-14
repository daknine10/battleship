//taking turns, making players, computer and human

import Player from "./player"



export default class GameController {
    constructor(player1 = new Player('Player 1'), player2 = new Player('Computer')) {
        this.player1 = player1
        this.player2 = player2
        this.activePlayer = player1
        this.q = []
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
        let row, column;
        if (!this.q.length) {
            row = Math.floor(Math.random() * 10);
            column = Math.floor(Math.random() * 10)
        }
        else {
            let coordinates = this.q.pop()
            while (this.activePlayer.gameboard.board[coordinates[0]][coordinates[1] === 1]) {
                coordinates = this.q.pop();
            }
            row = coordinates[0]
            column = coordinates[1]
        }

        while (this.activePlayer.gameboard.receiveAttack(row, column)) {
            this._refreshQueue(row, column)

            let coordinates = this.q.pop()
            while (this.activePlayer.gameboard.board[coordinates[0]][coordinates[1]] === 1) {
                coordinates = this.q.pop();
                console.log(coordinates)
            }
            row = coordinates[0]
            column = coordinates[1]
        };
        this.switchTurn();
    }

    _refreshQueue(row, column) {
        this.q = []

        this.q.push([row - 1, column], [row, column - 1], [row, column + 1], [row + 1, column])
        shuffle(this.q)
    }
}

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}