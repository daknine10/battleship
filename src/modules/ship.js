export default class Ship {
    constructor(length, pos = 'vertical') {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.pos = pos
    }

    isSunk() {
        if (this.hits === this.length) this.sunk = true;
    }

    hit() {
        this.hits += 1;
        this.isSunk();
    }
}