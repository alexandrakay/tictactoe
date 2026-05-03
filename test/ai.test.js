import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getMove } from '../modules/ai.js';

// ── Easy AI ──

test('Easy: returns a valid empty-cell index', () => {
  const board = Array(9).fill(null);
  const idx = getMove(board, 'EASY');
  assert.ok(idx >= 0 && idx <= 8);
  assert.equal(board[idx], null);
});

test('Easy: never picks an occupied cell (50 trials)', () => {
  const board = ['X','X','X','O','O',null,null,null,null];
  for (let i = 0; i < 50; i++) {
    const idx = getMove(board, 'EASY');
    assert.ok(board[idx] === null, `picked occupied cell ${idx}`);
  }
});

test('Easy: returns null when board is full', () => {
  const board = ['X','O','X','O','X','O','O','X','O'];
  assert.equal(getMove(board, 'EASY'), null);
});

// ── Medium AI ──

test('Medium: takes an immediate winning move', () => {
  // O O _ / X X _ / _ _ _  — index 2 wins row 0 for O
  const board = ['O','O',null, 'X','X',null, null,null,null];
  assert.equal(getMove(board, 'MEDIUM'), 2);
});

test('Medium: blocks an immediate player win', () => {
  // X X _ / O _ _ / _ _ _  — index 2 blocks row 0 for X
  const board = ['X','X',null, 'O',null,null, null,null,null];
  assert.equal(getMove(board, 'MEDIUM'), 2);
});

test('Medium: prefers winning over blocking', () => {
  // O O _ / X X _ / _ _ _
  // O can win at 2; X can be blocked at 5 — AI should go for the win
  const board = ['O','O',null, 'X','X',null, null,null,null];
  assert.equal(getMove(board, 'MEDIUM'), 2);
});
