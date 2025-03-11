document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameState[index] !== "" || !gameActive) return;

        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            alert("It's a draw!");
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => (cell.textContent = ""));
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
