const cells = document.querySelectorAll(".cell");
        const statusText = document.getElementById("status");
        const resetButton = document.getElementById("reset");

        let currentPlayer = "X";
        let board = ["", "", "", "", "", "", "", "", ""];
        let isGameActive = true;

        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]             
        ];

        function handleClick(event) {
            const index = event.target.dataset.index;

            if (board[index] !== "" || !isGameActive) return;

            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }

        function checkWinner() {
            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    statusText.textContent =` ${board[a]} Wins!`;
                    isGameActive = false;
                    return;
                }
            }

            if (!board.includes("")) {
                statusText.textContent = "It's a Draw!";
                isGameActive = false;
            }
        }

        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            isGameActive = true;
            currentPlayer = "X";
            statusText.textContent = "";
            cells.forEach(cell => (cell.textContent = ""));
        }

        cells.forEach(cell => cell.addEventListener("click", handleClick));
        resetButton.addEventListener("click", resetGame);