import Gameboard from "./gameboard"

export default class Player {
    constructor(name, gameboard = new Gameboard()) {
        this.name = name
        this.gameboard = gameboard
    }
}