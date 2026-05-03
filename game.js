import { DEFAULT_DIFFICULTY, isValidDifficulty } from './modules/start-screen.js';

// ── Difficulty selection ──

const diffBtns = document.querySelectorAll('.diff-btn');
let activeDifficulty = DEFAULT_DIFFICULTY;

diffBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const diff = btn.dataset.diff;
    if (!isValidDifficulty(diff)) return;
    activeDifficulty = diff;
    diffBtns.forEach(b => b.classList.toggle('active', b === btn));
  });
});

// ── Start game (wired up; logic implemented in issue #3) ──

function startGame() {
  const input = document.getElementById('player-name');
  const playerName = input.value.trim() || 'PLAYER';
  console.log('start:', { playerName, difficulty: activeDifficulty });
  // game loop implemented next
}

document.getElementById('btn-init').addEventListener('click', startGame);
document.getElementById('player-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') startGame();
});
