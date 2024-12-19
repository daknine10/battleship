import { Gameboard } from "./modules/gameboard";
import { Ship } from "./modules/ship";

const game = new Gameboard();

console.log(game.board)
const ship = new Ship(3)

game.placeShip(ship, 8, 3)
console.log(game.board)