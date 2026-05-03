# Neon Cyberpunk Tic Tac Toe

Best-of-5 Tic Tac Toe with a neon/cyberpunk aesthetic. Single-player vs. AI (Easy / Medium / Hard).

Self-contained browser game — no frameworks, no build step. Just open `index.html`.

See issue [#1](https://github.com/alexandrakay/tictactoe/issues/1) for the full PRD.

## Run

Open `index.html` in any modern browser, or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Status

Complete. All issues closed, 42 tests passing.

| Feature | Status |
|---------|--------|
| Static scaffold & start screen | ✅ |
| Single-round game loop with Easy AI | ✅ |
| Medium AI (win > block > random) | ✅ |
| Hard AI (minimax with alpha-beta pruning) | ✅ |
| Win/draw detection (all 8 combos) | ✅ |
| Animations (cell pop, winner pulse, score flash, overlays) | ✅ |
| Best-of-5 series with game-over screen | ✅ |
| Mobile responsive | ✅ |

