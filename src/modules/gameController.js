//taking turns, making players, computer and human
import Ship from "./ship"
import Player from "./player"



export default class GameController {
    constructor(player1 = new Player('Player 1'), player2 = new Player('Computer')) {
        this.player1 = player1
        this.player2 = player2
        this.activePlayer = player1
        this.q = []
        this.mode = 'computer'
    }

    switchTurn() {
        this.activePlayer = this.activePlayer === this.player1 ? this.player2: this.player1;
    }

    playerTurn(row, column) {
        if (this.activePlayer.gameboard.receiveAttack(row, column)) {
            return true
        };
        return false;
    }

    checkWinner() {
        if (this.player1.gameboard.checkSunk() || this.player2.gameboard.checkSunk())
            return true
    }

    computerTurn() {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10)
        let coordinates;

        if (!this.q.length) {            
            while (!this._checkValid(row, column)) {
                row = Math.floor(Math.random() * 10);
                column = Math.floor(Math.random() * 10)
            }
        }
        else {
            coordinates = this.q.pop()
            row = coordinates[0]
            column = coordinates[1]
        }

        if (this.activePlayer.gameboard.receiveAttack(row, column)) {
            this._refreshQueue(row, column)
            console.log(this.q)

            if (!this.q.length) {
                while (!this._checkValid(row, column)) {
                    row = Math.floor(Math.random() * 10);
                    column = Math.floor(Math.random() * 10)
                    }
                }
                if (this.activePlayer.gameboard.receiveAttack(row, column)) {
                    return true;
            }
            return true;
        };
        return false;
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