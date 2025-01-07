import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Player from "./modules/player.js"
import renderGameboard from "./modules/renderGameboard.js";
import "./styles.css"

const player1 = new Player(new Gameboard());
const player2 = new Player(new Gameboard());

const player1Board = document.querySelector('.player1')
const player2Board = document.querySelector('.player2')

const bigShip1 = new Ship(5);
const smallShip1 = new Ship(2, 'horizontal');
player1.gameboard.placeShip(bigShip1, 4, 2);
player1.gameboard.placeShip(smallShip1, 2, 5);

const bigShip2 = new Ship(5)
const smallShip2 = new Ship(2, 'horizontal')
player2.gameboard.placeShip(bigShip2, 2, 4);
player2.gameboard.placeShip(smallShip2, 6, 5);

renderGameboard(player1Board, player1.gameboard);
renderGameboard(player2Board, player2.gameboard);

console.log(player1.gameboard)
console.log(player2.gameboard)