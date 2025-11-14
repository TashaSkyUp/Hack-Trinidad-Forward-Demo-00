# Social Post Spinner

A lightweight React app to turn long-form content into platform-specific social posts using a
Gemini 2.0 Flash prompt. The app is built with Vite + React and is ready to deploy to GitHub Pages as
an entirely client-side single page application.

## Features

- Paste any long-form source text (blog post, notes, transcripts, etc.)
- Choose a persona and platform
- Adjust temperature for creativity vs. control
- Generates a concise, platform-ready post
- Stores your Gemini API key locally in the browser only

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Google Gemini 2.0 Flash (client-side API)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Then open the printed URL (typically [http://localhost:5173](http://localhost:5173)) in your browser.
Paste your Google Gemini API key into the UI before generating posts. The key is saved only in your
local browser storage so you can refresh without re-entering it.

## Deployment

This project is pre-configured for GitHub Pages. Update the `base` path in `vite.config.ts` if your
repository name is different. Then run:

```bash
npm run build
```

Deploy the contents of the `dist` folder to the `gh-pages` branch (for example with
[`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)). The built app is a
single page application that runs entirely on the client, so no server configuration is required.

## Environment Variables

Because GitHub Pages cannot securely store environment variables, the app asks for your Gemini API
key at runtime. If you prefer to bake a key into the build (e.g. for internal demos), add a
`.env.local` file with `VITE_GEMINI_API_KEY=...` and tweak the app to read from `import.meta.env`
instead of prompting the user.

---

This project is a starting point—feel free to customize the UI, add more platforms, or enhance the
prompt engineering.

