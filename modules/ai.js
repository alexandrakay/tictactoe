import { checkWinner } from './game-state.js';

function emptyIndices(board) {
  return board.reduce((acc, cell, i) => { if (cell === null) acc.push(i); return acc; }, []);
}

function findWinningMove(board, player) {
  for (const i of emptyIndices(board)) {
    const trial = [...board];
    trial[i] = player;
    if (checkWinner(trial) === player) return i;
  }
  return null;
}

function minimax(board, isMaximizing, alpha, beta) {
  const winner = checkWinner(board);
  if (winner === 'O') return 10;
  if (winner === 'X') return -10;
  if (board.every(c => c !== null)) return 0;

  const empty = emptyIndices(board);
  if (isMaximizing) {
    let best = -Infinity;
    for (const i of empty) {
      board[i] = 'O';
      best = Math.max(best, minimax(board, false, alpha, beta));
      board[i] = null;
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empty) {
      board[i] = 'X';
      best = Math.min(best, minimax(board, true, alpha, beta));
      board[i] = null;
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

export function getMove(board, difficulty) {
  const empty = emptyIndices(board);
  if (empty.length === 0) return null;

  if (difficulty === 'EASY') {
    return empty[Math.floor(Math.random() * empty.length)];
  }

  if (difficulty === 'MEDIUM') {
    return findWinningMove(board, 'O')
      ?? findWinningMove(board, 'X')
      ?? empty[Math.floor(Math.random() * empty.length)];
  }

  // HARD: alpha-beta minimax
  const mutable = [...board];
  let bestScore = -Infinity;
  let bestIdx = empty[0];
  for (const i of empty) {
    mutable[i] = 'O';
    const score = minimax(mutable, false, -Infinity, Infinity);
    mutable[i] = null;
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  return bestIdx;
}
