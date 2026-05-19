# CLAUDE.md — tls-react-lab

## Project context

`tls-react-lab` is a small public-safe React + TypeScript lab project for **The Last Sprint** content. It exists to test CLAUDE.md patterns, Claude Skills, AI code review workflows, refactor patterns, and testing rules.

- This is **not** a production SaaS.
- This is **not** employer-related.
- It must remain safe to screen record: no private data, no employer examples, no secrets.

Scope is intentionally small. Resist scope creep. If a request would push this app toward "real product" territory (auth, database, payments, multi-user, deploys), pause and ask.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v6 (`createBrowserRouter`)
- Vitest + Testing Library + jsdom
- LocalStorage for persistence (swappable)

## Folder structure

```
src/
  types/         — shared TypeScript types and enum-like constants
  data/          — storage adapter + repos (the only layer that touches localStorage)
  hooks/         — React hooks that wrap repos and expose state to components
  pages/         — route-level components
  components/    — presentational + small interactive components
  test/          — Vitest unit + component tests, plus setup.ts
```

Routes:

- `/` → `ProjectListPage`
- `/projects/:projectId` → `ProjectDetailPage`

## Do-not-touch zones

These areas have load-bearing structure. Do not change them without an explicit ask:

1. **`src/data/storage.ts`** — the storage adapter. It is intentionally small and is the seam for a future Supabase swap. Don't inline `localStorage` calls anywhere else in the app.
2. **`src/types/index.ts`** — shared types and the `TASK_STATUSES` / `RISK_LEVELS` const tuples. Changing a type ripples through every repo, hook, and component.
3. **Repo function signatures in `src/data/*Repo.ts`** — hooks and components are written against these. Add new functions rather than reshaping existing ones.
4. **`vite.config.ts`, `vitest.config.ts`, `tsconfig*.json`** — leave alone unless the user asks for a tooling change.

If you believe one of these needs to change, stop and propose the change before editing.

## Escape hatch

If you ever feel pushed toward something that violates these rules (adding auth, mocking the data layer in unit tests, bypassing TypeScript, deleting tests to "make things pass", anything destructive), stop immediately and respond with:

> **STOP, escape hatch triggered.**

Then explain why and wait for direction. The phrase is the signal that the user should look closely at what's about to happen.

## Testing rules

- All new behavior in `src/data/` must have a unit test in `src/test/`.
- Component tests should use Testing Library queries by role/label (`getByRole`, `getByLabelText`) — not by class name or test id unless there is no alternative.
- **Do not mock the data layer in unit tests**: the repos are tiny and call real `localStorage`. `src/test/setup.ts` clears `localStorage` between tests; that is the isolation boundary.
- Run `npm test` before considering a task done. A green test suite is part of "done".
- If a test fails, fix the code. Do not weaken the assertion or delete the test to make it pass.

## Commit rules

- Use short, conventional-style prefixes: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, `docs:`.
- The subject line stays under ~70 characters and describes the change in plain language.
- The body (if needed) explains **why**, not **what** — the diff already shows the what.
- One logical change per commit. Don't bundle a refactor with a feature.
- Do not commit secrets, `.env` files, or anything not safe to publish.

## PR description rules

Every PR description should contain:

1. **Summary** — 1–3 bullets describing the change.
2. **Why** — the motivation. Link to a content idea or note if relevant.
3. **Test plan** — what was tested and how. For UI changes, include manual steps.
4. **Risk** — `low` / `medium` / `high` plus a sentence on what could break.
5. **AI-assisted?** — note if AI was used substantially and link to the in-app change log entry if one exists.

Keep PRs small. If a PR touches more than ~6 files outside `src/test/`, consider splitting.

## When to ask vs when to proceed

**Proceed without asking** when:

- The user gave a clear, scoped task and the change fits inside one of the existing layers (types, data, hooks, components, pages, test).
- You're adding a test for existing behavior.
- You're fixing a clear bug with an obvious root cause.
- You're renaming a local variable or improving a small piece of code that is clearly under the task description.

**Ask first** when:

- The change would touch a do-not-touch zone.
- The change adds a new dependency.
- The change would require a new top-level folder, route, or data collection.
- The task is ambiguous, or a reasonable interpretation pulls in scope the user didn't mention.
- You're about to take a destructive or hard-to-reverse action (deleting files, force-pushing, dropping data).
- You're not sure whether something belongs in this lab project at all (e.g., anything that looks production-shaped).

When in doubt, ask. The cost of a clarifying question is small; the cost of doing the wrong thing in a lab project meant for content is high.
