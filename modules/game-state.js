export const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

export function createGameState() {
  return {
    board: Array(9).fill(null),
    scores: { X: 0, O: 0 },
    currentTurn: 'X',
    round: 1,
    roundActive: false,
  };
}

export function checkWinner(board) {
  for (const [a, b, c] of WIN_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export function getWinnerCombo(board) {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return combo;
  }
  return null;
}

export function isDraw(board) {
  return board.every(c => c !== null) && checkWinner(board) === null;
}

export function makeMove(state, index, player) {
  if (state.board[index] !== null) throw new Error('Cell is already occupied');
  const board = [...state.board];
  board[index] = player;
  return { ...state, board, currentTurn: player === 'X' ? 'O' : 'X' };
}

export function resetRound(state) {
  return { ...state, board: Array(9).fill(null), currentTurn: 'X', roundActive: false };
}

export function resetGame() {
  return createGameState();
}
