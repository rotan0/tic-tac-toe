/**
 * Tic-Tac-Toe — game logic
 *
 * Two-player (X / O) game with win detection, draw detection,
 * persistent score tracking (sessionStorage), and board reset.
 */

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

let board = Array(9).fill(null); // null | 'X' | 'O'
let currentPlayer = 'X';
let gameOver = false;
let scores = { X: 0, O: 0, draw: 0 };

/* ── DOM refs ── */
const cells      = Array.from(document.querySelectorAll('.cell'));
const statusEl   = document.getElementById('status');
const scoreXEl   = document.getElementById('score-x');
const scoreOEl   = document.getElementById('score-o');
const scoreDrawEl = document.getElementById('score-draw');
const newGameBtn  = document.getElementById('new-game');
const resetBtn    = document.getElementById('reset-scores');

/* ── Helpers ── */
function checkWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return { winner: b[a], line: [a, c, d] };
    }
  }
  return null;
}

function isDraw(b) {
  return b.every(Boolean) && !checkWinner(b);
}

function setStatus(msg, cls = '') {
  statusEl.textContent = msg;
  statusEl.className = 'status ' + cls;
}

function updateScoreboard() {
  scoreXEl.textContent    = scores.X;
  scoreOEl.textContent    = scores.O;
  scoreDrawEl.textContent = scores.draw;
}

/* ── Core game actions ── */
function handleClick(e) {
  const idx = parseInt(e.currentTarget.dataset.index, 10);
  if (gameOver || board[idx]) return;

  board[idx] = currentPlayer;
  renderCell(cells[idx], currentPlayer);

  const result = checkWinner(board);
  if (result) {
    gameOver = true;
    result.line.forEach(i => cells[i].classList.add('winning'));
    scores[result.winner]++;
    updateScoreboard();
    setStatus(`Player ${result.winner} wins! 🎉`, 'win');
    cells.forEach(c => (c.disabled = true));
    return;
  }

  if (isDraw(board)) {
    gameOver = true;
    scores.draw++;
    updateScoreboard();
    setStatus("It's a draw! 🤝", 'draw');
    cells.forEach(c => (c.disabled = true));
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatus(`Player ${currentPlayer}'s turn`);
}

function renderCell(cell, player) {
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;
}

function startNewGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.disabled = false;
  });

  setStatus("Player X's turn");
}

function resetScores() {
  scores = { X: 0, O: 0, draw: 0 };
  updateScoreboard();
  startNewGame();
}

/* ── Event listeners ── */
cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameBtn.addEventListener('click', startNewGame);
resetBtn.addEventListener('click', resetScores);

/* ── Init ── */
updateScoreboard();
