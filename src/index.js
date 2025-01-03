import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Player from "./modules/player.js"

const player1 = new Player(new Gameboard());
const player2 = new Player(new Gameboard());


const bigShip1 = new Ship(5);
const smallShip1 = new Ship(2, 'horizontal');
player1.gameboard.placeShip(bigShip1, 4, 2);
player1.gameboard.placeShip(smallShip1, 2, 5);

const bigShip2 = new Ship(5)
const smallShip2 = new Ship(2, 'horizontal')
player2.gameboard.placeShip(bigShip1, 2, 4);
player2.gameboard.placeShip(smallShip1, 6, 5);

console.log(player1.gameboard)
console.log(player2.gameboard)