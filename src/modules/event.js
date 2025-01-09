import renderGameboard from "./renderGameboard";
import Ship from "./ship";

let playerTurn = 1

export default function addPlayerListener(boardContainer, gameboard) {
    let gridChildren = boardContainer.querySelectorAll(".grid")

    gridChildren.forEach((child) => {
        child.addEventListener("click", () => {
            const column = parseInt(child.dataset.column)
            const row = parseInt(child.dataset.row)

            gameboard.receiveAttack(row, column)
            if (playerTurn === 1) playerTurn = 2
            else playerTurn = 1

            boardContainer.parentElement.dataset.turn = playerTurn

            if (gameboard.checkSunk() && playerTurn === 1) alert("Player 1 Won!")
            else if (gameboard.checkSunk() && playerTurn === 2) alert ("Player 2 Won!")

            renderGameboard(boardContainer, gameboard)
            nextTurn(boardContainer)
        })
    })
}

function nextTurn(boardContainer) {
    let gridChildren = boardContainer.querySelectorAll(".grid")

    gridChildren.forEach((child) => child.disabled = true)
}