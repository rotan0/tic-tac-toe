const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

// Multiplayer AJAX integration
function saveGameState() {
    fetch('game.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=save&state=${gameState.join('')}&player=${currentPlayer}`
    });
}

function loadGameState() {
    fetch('game.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=load'
    })
    .then(res => res.json())
    .then(data => {
        if (data.state) {
            gameState = data.state.split('');
            Array.from(board.getElementsByTagName('td')).forEach((cell, i) => {
                cell.textContent = gameState[i] || '';
            });
            currentPlayer = data.player || 'X';
            gameActive = !checkWinner() && gameState.includes('');
            statusDiv.textContent = gameActive ? `Player ${currentPlayer}'s turn` : statusDiv.textContent;
        }
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));
    if (gameState[cellIndex] !== '' || !gameActive) return;
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    saveGameState();
    if (checkWinner()) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (!gameState.includes('')) {
        statusDiv.textContent = 'Draw!';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState = Array(9).fill('');
    Array.from(board.getElementsByTagName('td')).forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    saveGameState();
}

board.addEventListener('click', handleCellClick);
restartBtn.addEventListener('click', restartGame);
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
window.onload = loadGameState;
