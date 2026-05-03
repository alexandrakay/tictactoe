import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  WIN_COMBOS,
  createGameState,
  checkWinner,
  getWinnerCombo,
  isDraw,
  makeMove,
  resetRound,
  startRound,
} from '../modules/game-state.js';

test('WIN_COMBOS has exactly 8 combinations', () => {
  assert.equal(WIN_COMBOS.length, 8);
});

// All 8 win patterns
const WIN_CASES = [
  { desc: 'row 0', board: ['X','X','X', null,null,null, null,null,null] },
  { desc: 'row 1', board: [null,null,null, 'X','X','X', null,null,null] },
  { desc: 'row 2', board: [null,null,null, null,null,null, 'X','X','X'] },
  { desc: 'col 0', board: ['X',null,null, 'X',null,null, 'X',null,null] },
  { desc: 'col 1', board: [null,'X',null, null,'X',null, null,'X',null] },
  { desc: 'col 2', board: [null,null,'X', null,null,'X', null,null,'X'] },
  { desc: 'diagonal \\', board: ['X',null,null, null,'X',null, null,null,'X'] },
  { desc: 'diagonal /', board: [null,null,'X', null,'X',null, 'X',null,null] },
];

for (const { desc, board } of WIN_CASES) {
  test(`checkWinner detects ${desc}`, () => {
    assert.equal(checkWinner(board), 'X');
  });

  test(`getWinnerCombo returns 3-cell array for ${desc}`, () => {
    const combo = getWinnerCombo(board);
    assert.ok(Array.isArray(combo) && combo.length === 3);
    for (const i of combo) assert.equal(board[i], 'X');
  });
}

test('checkWinner returns null on empty board', () => {
  assert.equal(checkWinner(Array(9).fill(null)), null);
});

test('checkWinner returns null on mid-game board with no winner', () => {
  assert.equal(checkWinner(['X','O',null, 'O',null,null, null,null,'X']), null);
});

test('isDraw on full board with no winner', () => {
  // X O X / O O X / O X O — verified no winner
  const b = ['X','O','X', 'O','O','X', 'O','X','O'];
  assert.equal(checkWinner(b), null);
  assert.ok(isDraw(b));
});

test('isDraw returns false when board has empty cells', () => {
  assert.ok(!isDraw(Array(9).fill(null)));
});

test('isDraw returns false when there is a winner', () => {
  const b = ['X','X','X', 'O','O',null, null,null,null];
  assert.ok(!isDraw(b));
});

test('makeMove places piece on the correct cell', () => {
  const next = makeMove(createGameState(), 4, 'X');
  assert.equal(next.board[4], 'X');
});

test('makeMove does not mutate original state', () => {
  const state = createGameState();
  makeMove(state, 4, 'X');
  assert.equal(state.board[4], null);
});

test('makeMove switches turn from X to O', () => {
  const next = makeMove(createGameState(), 0, 'X');
  assert.equal(next.currentTurn, 'O');
});

test('makeMove switches turn from O to X', () => {
  let state = makeMove(createGameState(), 0, 'X');
  state = makeMove(state, 1, 'O');
  assert.equal(state.currentTurn, 'X');
});

test('makeMove throws on an occupied cell', () => {
  const state = makeMove(createGameState(), 0, 'X');
  assert.throws(() => makeMove(state, 0, 'O'), /occupied/i);
});

test('resetRound clears board without resetting scores', () => {
  let state = makeMove(createGameState(), 0, 'X');
  state = { ...state, scores: { X: 2, O: 1 } };
  const reset = resetRound(state);
  assert.deepEqual(reset.board, Array(9).fill(null));
  assert.deepEqual(reset.scores, { X: 2, O: 1 });
});

test('resetRound resets currentTurn to X', () => {
  let state = makeMove(createGameState(), 0, 'X');
  const reset = resetRound(state);
  assert.equal(reset.currentTurn, 'X');
});

// startRound — ensures roundActive is true so the board accepts clicks
test('startRound sets roundActive to true', () => {
  const reset = resetRound(createGameState());
  assert.equal(reset.roundActive, false, 'resetRound leaves roundActive false');
  const active = startRound(reset);
  assert.ok(active.roundActive);
});

test('startRound does not mutate the input state', () => {
  const reset = resetRound(createGameState());
  startRound(reset);
  assert.equal(reset.roundActive, false);
});

test('startRound preserves board and scores', () => {
  const state = { ...createGameState(), scores: { X: 1, O: 2 } };
  const reset = resetRound(state);
  const active = startRound(reset);
  assert.deepEqual(active.board, Array(9).fill(null));
  assert.deepEqual(active.scores, { X: 1, O: 2 });
});
