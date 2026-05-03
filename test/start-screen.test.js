import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DIFFICULTIES, DEFAULT_DIFFICULTY, isValidDifficulty } from '../modules/start-screen.js';

test('MEDIUM is the default difficulty', () => {
  assert.equal(DEFAULT_DIFFICULTY, 'MEDIUM');
});

test('DIFFICULTIES contains EASY, MEDIUM, and HARD', () => {
  assert.deepEqual(DIFFICULTIES, ['EASY', 'MEDIUM', 'HARD']);
});

test('isValidDifficulty accepts valid options', () => {
  for (const d of ['EASY', 'MEDIUM', 'HARD']) {
    assert.ok(isValidDifficulty(d), `expected ${d} to be valid`);
  }
});

test('isValidDifficulty rejects unknown values', () => {
  for (const d of ['', 'easy', 'EXTREME', null, undefined]) {
    assert.ok(!isValidDifficulty(d), `expected ${String(d)} to be invalid`);
  }
});
