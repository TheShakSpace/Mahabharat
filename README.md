<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Mahabharat — The Cinematic Epic (AI Studio app)

This project contains everything you need to run the Mahabharat cinematic experience locally (built with Vite + React + TypeScript). It also connects to Google Gemini via an API key to power the app’s AI narration/content.

View your app in AI Studio: https://ai.studio/apps/435677eb-c95f-4cd0-b612-d71d6a3b1c16

---

## What you get

- A cinematic, interactive Mahabharat-themed experience
- AI-powered narration/content via Gemini (requires `GEMINI_API_KEY`)
- A modern UI built with React components and shared data/constants

---

## Prerequisites

- **Node.js** (includes npm)

Recommended: Node.js LTS.

---

## Run locally

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create or edit a local env file:

- File: `.env.local`

Add your Gemini API key:

```bash
GEMINI_API_KEY=YOUR_KEY_HERE
```

> **Security note:** Do not commit `.env.local` to version control.

### 3) Start the development server

```bash
npm run dev
```

After starting, open the URL Vite prints in your terminal (commonly `http://localhost:5173`).

---

## Build & preview

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

## Project structure (high level)

- `src/`
  - `components/` — React UI building blocks (timeline, characters, map, player, etc.)
  - `data.ts` — shared content/data used by the UI
  - `types.ts` — TypeScript types used across the app
  - `index.css` — global styles
- `assets/` — images and static media used by the app

---

## Environment variables

### `GEMINI_API_KEY` (required)

- Purpose: Authenticates requests to Google Gemini
- Location: `.env.local`

If this is missing/invalid, the app may fail to generate AI content or narration.

---

## Troubleshooting

### `GEMINI_API_KEY` not set
- Confirm you created `.env.local` at the project root
- Confirm the variable name is exactly `GEMINI_API_KEY`

### Port already in use
- Stop the process using the port, or
- Re-run `npm run dev` (Vite may prompt for another port)

### Install issues
- Re-run `npm install`
- Ensure Node.js/npm versions are compatible with the project

---

## License

Add your project license information here if you haven’t already.

