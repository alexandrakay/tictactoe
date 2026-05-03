## Parent PRD

#1

## Type

AFK

## What to build

Wire up the third screen — the dramatic full-screen game-over panel
that takes over when the best-of-5 series ends. Determine the series
outcome from the final scoreboard (player wins, AI wins, or tie) and
present the appropriate title, subtitle, score line, and PLAY AGAIN
button. PLAY AGAIN returns the user to the start screen with the
scoreboard, round counter, and series state fully reset, so they can
change name or difficulty for the next series.

The previous slice (#multi-round-series) freezes the board on the
final round result and stops auto-advance. This slice picks up at that
moment — instead of (or in addition to) freezing, transition to the
game-over screen with an entrance animation. The `gameoverEntrance`
animation, the per-outcome subtitle text, and the final score format
are all specified in the parent PRD.

See the parent PRD's "Visual Spec" for the three outcome colours and
the "User Stories" section (28–34) for the exact title/subtitle text
keyed off outcome.

## Acceptance criteria

- [ ] When the player's score reaches 3 (or exceeds the AI's after 5 rounds), the game-over screen replaces the game screen
- [ ] When the AI's score reaches 3 (or exceeds the player's after 5 rounds), the game-over screen replaces the game screen
- [ ] When 5 rounds finish with the scores tied, the game-over screen replaces the game screen
- [ ] Player-win shows "VICTORY" in glowing magenta with subtitle "[NAME] CONQUERS THE GRID"
- [ ] AI-win shows "DEFEATED" in glowing cyan with subtitle "THE MACHINE PREVAILS"
- [ ] Tie shows "STANDOFF" in glowing purple with subtitle "EVENLY MATCHED"
- [ ] The final series score is displayed in the format "3 — 2" (player score on the left)
- [ ] The game-over content has an entrance animation (`gameoverEntrance`)
- [ ] PLAY AGAIN button returns to the start screen
- [ ] After PLAY AGAIN, scoreboard reads 0–0, round counter reads "ROUND 1 OF 5", board is empty, and clicking INITIALIZE again starts a fresh series
- [ ] The previously entered name and selected difficulty remain pre-filled on the start screen so the player can adjust if desired

## Blocked by

- Blocked by #multi-round-series (this issue assumes the series-ended condition is detectable and the auto-advance is cancelled)

## User stories addressed

- User story 27 (full-screen game-over)
- User story 28 (VICTORY in magenta)
- User story 29 (DEFEATED in cyan)
- User story 30 (STANDOFF in purple)
- User story 31 (per-outcome subtitle line)
- User story 32 (final series score)
- User story 33 (PLAY AGAIN button)
- User story 34 (PLAY AGAIN returns to start screen)
