const rows = 10;
const columns = 10;

export default class Gameboard {  
    constructor() {
        this.board = []
        this.initializeBoard()
        this.ships = []
    }

    initializeBoard() {
        if (this.ships) {
            this.ships = []
        }
        
        for (let i = 0; i < rows; i++) {
            this.board[i] = []
            for (let j = 0; j < columns; j++) {
                this.board[i][j] = null
            }
        }
    }

    placeShip(ship, row, column) {
        this.ships.push(ship)
        switch (ship.pos) {
            case 'vertical':
                if (rows - ship.length < row)  {
                    return false
                }
                for (let i = 0; i < ship.length; i++) {
                    this.board[row][column] = ship;
                    row++;
                }
                return true;

            case 'horizontal':
                if (columns - ship.length < column) {
                    return false
                }     
                for (let i = 0; i < ship.length; i++) {
                    this.board[row][column] = ship;
                    column++;
                }  
                return true;
        }
    }

    receiveAttack(row, column) {
        if (this.board[row][column] !== null) {
            this.board[row][column].hit()
            return true
        }
        this.board[row][column] = 1
        return false
    }

    checkSunk() {
        if (this.ships.every((a) => a.sunk === true)) return true;
        return false
    }
};

