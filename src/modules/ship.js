export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.pos = 'vertical'
    }

    isSunk() {
        if (this.hits === this.length) this.sunk = true;
    }

    hit() {
        this.hits += 1;
        this.isSunk();
    }
}

module.exports = { Ship }