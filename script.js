let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let twoPlayerMode = true;

function handleCellClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    updateBoard();
    
    if (checkWinner()) {
        endGame(`Player ${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== '')) {
        endGame('It\'s a tie!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (!twoPlayerMode && currentPlayer === 'O') {
            // AI makes a move after a short delay
            setTimeout(makeAIMove, 500);
        }
    }
}

function makeAIMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];
        board[aiMove] = 'O';
        updateBoard();

        if (checkWinner()) {
            endGame('AI wins!');
        } else if (board.every(cell => cell !== '')) {
            endGame('It\'s a tie!');
        } else {
            currentPlayer = 'X';
            updateBoard();  // Update the board after AI move to reflect the change
        }
    }
}



function endGame(message) {
    gameActive = false;
    document.getElementById('status').innerText = message;
}

function updateBoard() {
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).innerText = board[i];
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.getElementById('status').innerText = 'Player X\'s turn';

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = '';
    });
}

function toggleMode() {
    twoPlayerMode = !twoPlayerMode;
    resetGame();
    document.getElementById('toggleMode').innerText = twoPlayerMode ? 'Switch to AI Mode' : 'Switch to Two-Player Mode';
}

// Dynamically generate the game board
const boardContainer = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.addEventListener('click', () => handleCellClick(i));
    boardContainer.appendChild(cell);
}
