## Parent PRD

#1

## Type

AFK

## What to build

Implement the Hard difficulty: an alpha-beta pruned minimax search
returning the optimal move for 'O'. Tic Tac Toe is small enough that
this is mathematically unbeatable — Hard must never lose.

Hooks into the existing `getMove(board, "hard")` path in `src/ai.js`
(which currently falls through to Easy). No new public API; the AI
module stays pure JS, no DOM access.

Per the parent PRD's AI module section: 'O' is the maximizing player.
Use alpha-beta pruning for performance. Treat ties as score 0, AI win
as +1 (favouring quicker wins is optional but encouraged), player win
as -1 (favouring longer losses is optional but encouraged). Reuse
`WIN_COMBOS` from `src/state.js` for terminal-state detection.

## Acceptance criteria

- [ ] `getMove(board, "hard")` in `src/ai.js` returns a minimax-optimal move
- [ ] When an immediate winning move exists, Hard plays it (test for every win line)
- [ ] When the player has an immediate winning threat, Hard blocks it (test for every win line)
- [ ] In simulations of Hard vs. random opponents (≥1000 games as 'O'), Hard never loses (only wins or draws)
- [ ] In simulations of Hard vs. Hard (both sides perfect play), every game is a draw
- [ ] AI move latency under 50ms on a typical laptop (alpha-beta keeps the search fast on a 9-cell board)
- [ ] All Easy and Medium tests still pass; new Hard tests are added under `tests/ai-hard.test.js`
- [ ] Selecting HARD on the start screen plays the new behaviour in-game (manual verification)

## Blocked by

- Blocked by #medium-ai (sequential AI work; both touch `src/ai.js`)

## User stories addressed

- User story 15 (Hard plays perfectly using minimax)
