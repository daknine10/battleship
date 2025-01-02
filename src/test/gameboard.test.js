import Gameboard from "../modules/gameboard.js";
import Ship from "../modules/ship.js";

const board = new Gameboard()
const ship = new Ship(3)
const horizontalShip = new Ship(2, 'horizontal')

describe('Gameboard', () => {
    afterEach(() => {
        board.initializeBoard()
    })
    
    test('Ship cannot be placed when it extends over the Gambeoard', () => {
        expect(board.placeShip(ship, 8, 3)).toEqual(false)
    })

    test('Ship can be placed in both directions and is the right length.', () => {
        board.placeShip(ship, 6, 3);
        expect(board.board[6][3]).toBe(ship);
        expect(board.board[7][3]).toBe(ship);
        expect(board.board[8][3]).toBe(ship);

        board.placeShip(horizontalShip, 2, 2);
        expect(board.board[2][2]).toBe(horizontalShip);
        expect(board.board[2][3]).toBe(horizontalShip);
    })

    test('Ship receives attacks correctly and can be sunk.', () => {
        board.placeShip(ship, 6, 3);
        expect(board.receiveAttack(6, 3)).toEqual(true);
        expect(ship.hits).toEqual(1);
        expect(board.receiveAttack(7, 3)).toEqual(true);
        expect(board.receiveAttack(8, 3)).toEqual(true);
        expect(ship.sunk).toEqual(true);

        console.log(board.board)
        expect(board.checkSunk()).toEqual(true);
    })

    test('Missed attacks register correctly', () => {
        board.placeShip(ship, 6, 3);
        expect(board.receiveAttack(5, 3)).toEqual(false);
        expect(board.board[5][3]).toEqual(1);
    });
});