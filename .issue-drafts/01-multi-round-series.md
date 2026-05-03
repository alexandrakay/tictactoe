## Parent PRD

#1

## Type

AFK

## What to build

Extend the single-round game loop into the full best-of-5 series. After
a round ends, pause for 2 seconds (so the win-pulse + result overlay
have time to play) then auto-advance to the next round: clear the
board, increment the round counter, restore X's turn, and keep the
scoreboard intact. The series must end early when either side reaches
3 wins, and otherwise end after 5 rounds regardless of standing.

This slice owns the multi-round flow, the round counter UI, and the
score-flash animation that fires when a side scores. It does **not**
cover the game-over screen visuals — that lands in the follow-up
issue. When the series ends here, simply stop auto-advancing and freeze
the final state on the game screen; the next issue takes over from
there.

See the parent PRD's "ScreenManager" and "Animator" sections for the
intended owners of the auto-advance timer and `scoreFlash` animation.

## Acceptance criteria

- [ ] After a round ends, the result overlay stays visible for 2 seconds, then the board clears and the next round begins automatically
- [ ] On round advance the round counter updates ("ROUND 2 OF 5", "ROUND 3 OF 5", ...)
- [ ] The current turn resets to the player (X) at the start of every new round
- [ ] The scoreboard persists across rounds — only the winning side's score increments after a round
- [ ] The winning side's score element flashes/bounces (`scoreFlash` animation) immediately after a round ends
- [ ] Draws do not increment either score and do not trigger a flash
- [ ] The series ends immediately the first time either side's score reaches 3 (no extra rounds played)
- [ ] The series ends after 5 played rounds regardless of standing
- [ ] When the series ends, the auto-advance timer does **not** start a new round; the board freezes on the final result
- [ ] The 2s auto-advance timer is cancellable so it never fires after the series has ended

## Blocked by

- Blocked by #3 (single-round game loop with Easy AI)

## User stories addressed

- User story 20 (auto-advance to next round after 2s)
- User story 21 (live scoreboard)
- User story 22 (player score flash on win)
- User story 23 (AI score flash on win)
- User story 24 (round counter "ROUND N OF 5")
- User story 25 (series ends at first-to-3)
- User story 26 (series ends after 5 rounds regardless)
