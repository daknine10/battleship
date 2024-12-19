const { Gameboard } = require('../gameboard.js')
const { Ship } = require('../ship.js')

const board = new Gameboard()
const ship = new Ship(3)

test('Place ship on gameboard', () => {
    expect(board.placeShip(ship, 8, 3)).toEqual(false)
})