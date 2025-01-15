//taking turns, making players, computer and human
import Ship from "./ship"
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
            if (this.checkWinner()) {
                console.log(`${this.activePlayer.name} wins!`);
                return true;
            }
            return false
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

        if (!this.q.length) {            
            while (!this._checkValid(row, column)) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10)
            }
        }
        else {
            let coordinates = this.q.pop()
            row = coordinates[0]
            column = coordinates[1]
        }

        console.log(row)
        console.log(column)

        while (this.activePlayer.gameboard.receiveAttack(row, column)) {
            this._refreshQueue(row, column)

            if (!this.q.length) {
                while (!this._checkValid(row, column)) {
                    row = Math.floor(Math.random() * 10);
                    column = Math.floor(Math.random() * 10)
                    continue
                }
            }

            let coordinates = this.q.pop()

            row = coordinates[0]
            column = coordinates[1]
        };
        this.switchTurn();
    }

    _refreshQueue(row, column) {
        this.q = [[row - 1, column], [row, column - 1], [row, column + 1], [row + 1, column]]
        this.q = this.q.filter((coordinate) => this._checkValid(coordinate[0], coordinate[1]))
        shuffle(this.q)
    }

    _checkValid(row, column) {
        if (row < 0 || row >= 10 || column < 0 || column >= 10) {
            return false;
        }
        return this.activePlayer.gameboard.board[row][column] === null || this.activePlayer.gameboard.board[row][column] instanceof Ship;
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