## Parent PRD

#1

## Type

AFK

## What to build

Replace the current Easy-fallback Medium difficulty with proper Medium
behaviour: a heuristic AI that can win, can defend, but is not optimal.
The decision rule (per the parent PRD's AI module section) is exactly:

1. If any move would let the AI ('O') complete a winning line — take it.
2. Else, if any move by the player ('X') would complete a winning line on
   the next turn — block it.
3. Else, fall back to a uniformly random empty cell.

This must hook into the same `getMove(board, difficulty)` entry point
in `src/ai.js` already used by Easy — no new public API. All logic
remains pure JS with no DOM access.

Reuse `WIN_COMBOS` from `src/state.js` rather than re-declaring win
combinations.

## Acceptance criteria

- [ ] `getMove(board, "medium")` in `src/ai.js` no longer falls through to easy
- [ ] When an immediate winning move exists for 'O', Medium plays it (covered by tests for every win line)
- [ ] When the player ('X') has an immediate winning threat and 'O' does not have its own win, Medium blocks the threat (covered by tests for every win line)
- [ ] When neither a win nor a block is available, Medium chooses uniformly among empty cells (verified statistically over many runs in tests)
- [ ] Medium prefers winning over blocking when both are possible in the same turn
- [ ] Selecting MEDIUM on the start screen actually plays the new behaviour in-game (manual verification)
- [ ] All existing Easy tests still pass; new Medium tests are added under `tests/ai-medium.test.js`

## Blocked by

- Blocked by #3 (Easy AI + game loop must already exist for the difficulty selector to be wired in)

## User stories addressed

- User story 14 (Medium blocks player wins, takes its own wins)
