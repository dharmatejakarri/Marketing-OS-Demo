# Contributing

Thanks for your interest in the **EB1A Experts — Marketing OS** demo. This repo is an internal showcase, but contributions from team members and approved collaborators are welcome.

This is a **proprietary** project (see `LICENSE`). External pull requests will be reviewed but cannot be merged without prior written approval from EB1A Experts.

---

## Project layout

```
.
├── index.html                  ← GitHub Pages entry point
├── EB1A Marketing Platform.html ← original entry (kept for backward compat)
├── styles.css                  ← global styles, theme tokens, layout
├── styles-modals.css           ← modal & overlay styles
├── tweaks-panel.jsx            ← in-app theme/density/accent tweak panel
├── components/                 ← React components (Babel-in-browser)
│   ├── store.jsx               ← global state singleton
│   ├── icons.jsx               ← inline SVG icon set
│   ├── data.jsx                ← dummy data (posts, accounts, competitors…)
│   ├── shell.jsx               ← topbar, sidenav, command palette, toasts
│   ├── dashboard.jsx           ← Command Center
│   ├── queue.jsx               ← Content Queue
│   ├── approval.jsx            ← Approval Workflow
│   ├── screens1.jsx            ← Calendar, Trends, Influencers
│   ├── screens2.jsx            ← Daily Brief, Onboarding, Settings, etc.
│   ├── reports.jsx             ← Email Reports + Integrations
│   ├── engagement.jsx          ← Engagement Hub
│   └── modals.jsx              ← every modal & dialog
├── qa/                         ← QA reference screenshots
├── uploads/                    ← brand reference assets (internal)
└── .github/workflows/pages.yml ← auto-deploy to GitHub Pages
```

---

## Local development

No build step is required — the site uses `@babel/standalone` to compile JSX in the browser.

```bash
# From the repo root, start any static server. Examples:
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000/`.

---

## Code style

- **Components**: functional React with Hooks. Keep one major screen per file.
- **State**: prefer the singleton `Store` in `components/store.jsx` for cross-screen state. Use local `React.useState` for screen-local UI.
- **Styling**: use the CSS variables already defined in `styles.css` (`--accent`, `--bg`, `--surface`, `--text-1`, etc.). Avoid hard-coded hex colors in new components.
- **Icons**: add new icons to `components/icons.jsx` rather than inlining SVG in screen files.
- **Data**: all dummy data lives in `components/data.jsx`. Do not commit real client data.

---

## Branching & commits

- Branch off `main` using `feat/<short-name>` or `fix/<short-name>`.
- Keep commits focused and use imperative subject lines (e.g., `add sentiment filter to engagement hub`).
- Open a PR against `main`. CI will redeploy GitHub Pages automatically once merged.

---

## What NOT to commit

- Real client names, emails, post content, or analytics
- API keys, tokens, or `.env` files
- Brand assets or PDFs that have not been cleared for public release
- `node_modules/`, build artifacts, OS files (already in `.gitignore`)

---

## Reporting issues

Open an issue describing:

1. What you expected to see
2. What you actually saw
3. Steps to reproduce (browser, screen, screen size)
4. A screenshot if the issue is visual

For anything sensitive, email **contact@eb1aexperts.com** instead of opening a public issue.
