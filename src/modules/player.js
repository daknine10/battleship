import Gameboard from "./gameboard"

export default class Player {
    constructor(name, type = 'real', gameboard = new Gameboard()) {
        this.name = name
        this.gameboard = gameboard
        this.type = type
    }
}