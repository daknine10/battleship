import Gameboard from "./modules/gameboard.js";
import Ship from "./modules/ship.js";
import Player from "./modules/player.js"
import "./styles.css"
import ScreenController from "./modules/screenController.js";
import GameController from "./modules/gameController.js";



const player1 = new Player('Player1');
const player2 = new Player('Player2');
const game = new GameController(player1, player2)

const player1Board = document.querySelector('.player1')
const player2Board = document.querySelector('.player2')
const screenController = new ScreenController(game, player1Board, player2Board)

const bigShip1 = new Ship(5);
const smallShip1 = new Ship(2, 'horizontal');
player1.gameboard.placeShip(bigShip1, 4, 2);
player1.gameboard.placeShip(smallShip1, 2, 5);

const bigShip2 = new Ship(5)
const smallShip2 = new Ship(2, 'horizontal')
player2.gameboard.placeShip(bigShip2, 2, 4);
player2.gameboard.placeShip(smallShip2, 6, 5);

screenController.renderGameboard(player1Board, game.player1)
screenController.renderGameboard(player2Board, game.player2)

console.log(player1.gameboard)
console.log(player2.gameboard)

// need a gamecontroller to drive the turns