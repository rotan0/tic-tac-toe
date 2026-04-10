# Tic-Tac-Toe

A clean, dark-themed two-player Tic-Tac-Toe game playable in any browser.

**Play it live → https://rotan0.github.io/tic-tac-toe/**

## Features

- Two-player gameplay — **X** vs **O** on the same device
- Automatic win detection across all rows, columns, and diagonals
- Draw detection when the board is full
- Winning cells are highlighted with a pulse animation
- Score tracker persists across rounds (X wins · Draws · O wins)
- **New Game** resets the board while keeping scores
- **Reset Scores** clears all scores and starts fresh
- Fully responsive — works on desktop and mobile

## Run locally

No build step required. Just open `index.html` in your browser:

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or serve it with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

## Hosting (GitHub Pages)

The game is hosted via **GitHub Pages** directly from the `main` branch root.

To enable it on your own fork:
1. Go to **Settings → Pages**
2. Set **Source** to `Deploy from a branch`
3. Select `main` branch, `/ (root)` folder
4. Save — your game will be live at `https://<username>.github.io/<repo>/`

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and board markup |
| `style.css` | Dark-theme styling and animations |
| `game.js` | All game logic (win/draw detection, scoring, events) |
