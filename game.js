import { DEFAULT_DIFFICULTY, isValidDifficulty } from './modules/start-screen.js';
import { createGameState, checkWinner, getWinnerCombo, isDraw, makeMove, resetRound, resetGame } from './modules/game-state.js';
import { getMove } from './modules/ai.js';

// ── State ──

let state = createGameState();
let playerName = 'PLAYER';
let difficulty = DEFAULT_DIFFICULTY;
let aiThinking = false;

// ── DOM refs ──

const screens = {
  start:    document.getElementById('screen-start'),
  game:     document.getElementById('screen-game'),
  gameover: document.getElementById('screen-gameover'),
};

const els = {
  playerNameInput: document.getElementById('player-name'),
  diffBtns:        document.querySelectorAll('.diff-btn'),
  btnInit:         document.getElementById('btn-init'),
  scorePlayerName: document.getElementById('score-player-name'),
  scoreX:          document.getElementById('score-x'),
  scoreO:          document.getElementById('score-o'),
  roundLabel:      document.getElementById('round-label'),
  turnIndicator:   document.getElementById('turn-indicator'),
  board:           document.getElementById('board'),
  roundOverlay:    document.getElementById('round-overlay'),
  roundResultText: document.getElementById('round-result-text'),
  gameoverTitle:   document.getElementById('gameover-title'),
  gameoverSubtitle:document.getElementById('gameover-subtitle'),
  gameoverScore:   document.getElementById('gameover-score'),
  btnPlayAgain:    document.getElementById('btn-play-again'),
};

// ── ScreenManager ──

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Renderer ──

function renderBoard() {
  const cells = els.board.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    const val = state.board[i];
    if (val && !cell.textContent) {
      cell.textContent = val;
      cell.classList.add(val.toLowerCase(), 'pop');
      cell.addEventListener('animationend', () => cell.classList.remove('pop'), { once: true });
    }
  });
}

function clearBoard() {
  els.board.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

function renderScoreboard() {
  els.scorePlayerName.textContent = playerName;
  els.scoreX.textContent = state.scores.X;
  els.scoreO.textContent = state.scores.O;
  els.roundLabel.textContent = `ROUND ${state.round} OF 5`;
}

function renderTurnIndicator() {
  const isPlayerTurn = state.currentTurn === 'X' && !aiThinking;
  els.turnIndicator.textContent = aiThinking ? 'AI THINKING...' : 'YOUR TURN';
  els.turnIndicator.className = 'turn-indicator ' + (isPlayerTurn ? 'yours' : 'ai');
}

// ── Animator ──

function animateWinnerCells(combo, winner) {
  const cells = els.board.querySelectorAll('.cell');
  combo.forEach(i => {
    cells[i].classList.add(winner === 'X' ? 'winner-x' : 'winner-o');
  });
}

function flashScore(player) {
  const el = player === 'X' ? els.scoreX : els.scoreO;
  el.classList.remove('flash');
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add('flash');
  el.addEventListener('animationend', () => el.classList.remove('flash'), { once: true });
}

function showRoundOverlay(text, colorClass) {
  els.roundResultText.textContent = text;
  els.roundResultText.className = 'round-result-text ' + colorClass;
  els.roundResultText.classList.remove('round-result-text');
  void els.roundResultText.offsetWidth;
  els.roundResultText.classList.add('round-result-text');
  els.roundOverlay.classList.remove('hidden');
}

function hideRoundOverlay() {
  els.roundOverlay.classList.add('hidden');
}

// ── Game logic ──

function isBoardClickable() {
  return state.roundActive && state.currentTurn === 'X' && !aiThinking;
}

function handleRoundEnd(winner) {
  state = { ...state, roundActive: false };

  if (winner === 'X' || winner === 'O') {
    const combo = getWinnerCombo(state.board);
    animateWinnerCells(combo, winner);
    state = { ...state, scores: { ...state.scores, [winner]: state.scores[winner] + 1 } };
    flashScore(winner);
    renderScoreboard();
    const label = winner === 'X' ? 'YOU WIN!' : 'AI WINS!';
    const cls = winner === 'X' ? 'yours' : 'ai';
    showRoundOverlay(label, cls);
  } else {
    showRoundOverlay('DRAW!', 'draw');
  }

  // Check series over (first to 3 or round 5 done)
  const seriesOver = state.scores.X >= 3 || state.scores.O >= 3 || state.round >= 5;

  setTimeout(() => {
    hideRoundOverlay();
    if (seriesOver) {
      showGameOver();
    } else {
      nextRound();
    }
  }, 2000);
}

function handleCellClick(index) {
  if (!isBoardClickable()) return;
  if (state.board[index] !== null) return;

  state = makeMove(state, index, 'X');
  renderBoard();

  const winner = checkWinner(state.board);
  if (winner || isDraw(state.board)) {
    handleRoundEnd(winner);
    return;
  }

  // AI's turn
  aiThinking = true;
  renderTurnIndicator();

  setTimeout(() => {
    const aiIndex = getMove(state.board, difficulty);
    if (aiIndex !== null) {
      state = makeMove(state, aiIndex, 'O');
      renderBoard();
    }
    aiThinking = false;

    const afterAI = checkWinner(state.board);
    if (afterAI || isDraw(state.board)) {
      handleRoundEnd(afterAI);
    } else {
      renderTurnIndicator();
    }
  }, 500);
}

function nextRound() {
  state = resetRound({ ...state, round: state.round + 1 });
  clearBoard();
  renderScoreboard();
  renderTurnIndicator();
}

function showGameOver() {
  const { X, O } = state.scores;
  let titleText, titleClass, subtitle;

  if (X > O) {
    titleText = 'VICTORY';
    titleClass = 'win';
    subtitle = `${playerName} CONQUERS THE GRID`;
  } else if (O > X) {
    titleText = 'DEFEATED';
    titleClass = 'lose';
    subtitle = 'THE MACHINE PREVAILS';
  } else {
    titleText = 'STANDOFF';
    titleClass = 'draw';
    subtitle = 'EVENLY MATCHED';
  }

  els.gameoverTitle.textContent = titleText;
  els.gameoverTitle.className = `gameover-title ${titleClass}`;
  els.gameoverSubtitle.textContent = subtitle;
  els.gameoverScore.textContent = `${X} — ${O}`;
  showScreen('gameover');
}

function startGame() {
  playerName = els.playerNameInput.value.trim() || 'PLAYER';
  state = resetGame();
  clearBoard();
  renderScoreboard();
  renderTurnIndicator();
  hideRoundOverlay();
  state = { ...state, roundActive: true };
  showScreen('game');
}

function playAgain() {
  difficulty = DEFAULT_DIFFICULTY;
  els.diffBtns.forEach(b => b.classList.toggle('active', b.dataset.diff === DEFAULT_DIFFICULTY));
  els.playerNameInput.value = '';
  showScreen('start');
}

// ── Difficulty selection ──

els.diffBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const diff = btn.dataset.diff;
    if (!isValidDifficulty(diff)) return;
    difficulty = diff;
    els.diffBtns.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// ── Board clicks ──

els.board.addEventListener('click', e => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  handleCellClick(Number(cell.dataset.index));
});

// ── Button wiring ──

els.btnInit.addEventListener('click', startGame);
els.playerNameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startGame(); });
els.btnPlayAgain.addEventListener('click', playAgain);
