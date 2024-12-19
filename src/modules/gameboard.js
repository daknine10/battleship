const rows = 10;
const columns = 10;

class Gameboard {  
    constructor() {
        this.board = []
        this.initializeBoard()
    }

    initializeBoard() {
        for (let i = 0; i < rows; i++) {
            this.board[i] = []
            for (let j = 0; j < columns; j++) {
                this.board[i][j] = []
            }
        }
    }

    placeShip(ship, row, column) {
        switch (ship.pos) {
            case 'vertical':
                if (rows - ship.length < row)  {
                    return false
                }       
        }
    }
};

const game = new Gameboard();

console.log(game.board)