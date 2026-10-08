# Mayday

Prototype of **Mayday**, a superhero emergency alert app. A person in trouble raises an alert, reaches the right hero, and tracks the request from raised to resolved.

Built with React and Vite. Screens are designed in Figma and rebuilt here as a clickable prototype.

## Run it locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. On vercel.com, choose **Add New → Project** and import the repo.
3. Vercel detects Vite automatically. Keep the defaults (build: `npm run build`, output: `dist`) and press **Deploy**.

Every push to `main` redeploys.

## Structure

- `src/App.jsx` holds the list of screens and which one is showing.
- `src/screens/` has one file per screen.
- `src/index.css` has the colour tokens and the phone frame.
