export const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'];
export const DEFAULT_DIFFICULTY = 'MEDIUM';

export function isValidDifficulty(d) {
  return DIFFICULTIES.includes(d);
}
