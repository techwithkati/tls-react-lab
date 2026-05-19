# tls-react-lab

A small public-safe React + TypeScript lab for The Last Sprint. Used to test CLAUDE.md patterns, Claude Skills, AI code review workflows, refactor patterns, and testing rules.

## Stack

Vite · React 18 · TypeScript · Tailwind v4 · React Router v6 · Vitest · Testing Library · LocalStorage

## Scripts

```bash
npm install
npm run dev        # start the dev server
npm test           # run the test suite once
npm run test:watch # watch mode
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + vite build
```

## Features

- Project list: add, rename, delete.
- Project detail: tasks (add / edit / delete / change status: todo · doing · done · blocked).
- AI change log per project: title, files touched, risk level, reviewed flag, notes.
- Review checklist per entry: tests reviewed, edge cases checked, types checked, manual review completed.
- LocalStorage persistence, isolated behind a small repo layer so the backend can be swapped later.

See `CLAUDE.md` for the rules that govern AI-assisted changes to this repo.
