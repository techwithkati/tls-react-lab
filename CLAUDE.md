# CLAUDE.md — tls-react-lab

# Version: 1.1

# Status: testing

# Last updated: 2026-05-19

This file is used in `tls-react-lab`, a public-safe React + TypeScript lab project for testing CLAUDE.md patterns, Claude Skills, AI code review workflows, refactor patterns, and testing rules.

This is the source file behind the reusable React + TypeScript CLAUDE.md template in The Last Sprint pattern repo.

This file is not universal. It is intentionally specific to this repo.

---

## 1. Project Context

<!--
Why this section exists:
Claude needs to know what this repo is for before it edits files.
This is a lab project, not a product. The boundary matters because Claude will otherwise try to make the app more production-shaped than it needs to be.
-->

`tls-react-lab` is a small public-safe React + TypeScript lab project for The Last Sprint content.

It exists to test:

- CLAUDE.md patterns
- Claude Skills
- AI code review workflows
- Refactor patterns
- Testing rules
- Public-safe examples for content

This is not a production SaaS.

This is not employer-related.

It must remain safe to screen record:

- No private data
- No employer examples
- No secrets
- No real customer data
- No proprietary logic

Scope is intentionally small.

Do not add production-shaped features unless explicitly asked:

- No auth
- No database
- No payments
- No multi-user accounts
- No deployment setup
- No analytics
- No AI chat feature

If a request would push this app toward real product territory, stop and ask first.

---

## 2. Stack

<!--
Why this section exists:
Claude has defaults from training. This section tells Claude what this project actually uses so it does not introduce a different routing, testing, styling, or state pattern.
-->

Use the existing stack:

- Vite + React 18 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- React Router v6 with `createBrowserRouter`
- Vitest + Testing Library + jsdom
- LocalStorage for persistence
- No backend
- No auth
- No database

Do not introduce a new library unless the user explicitly asks or approves it.

Do not replace existing stack decisions casually.

---

## 3. Folder Structure

<!--
Why this section exists:
Claude should place new code where it belongs instead of inventing new folders every time. A stable folder structure makes the repo easier to review and easier to screen record.
-->

Current structure:

```txt
src/
  types/         — shared TypeScript types and enum-like constants
  data/          — storage adapter + repos; the only layer that touches localStorage
  hooks/         — React hooks that wrap repos and expose state to components
  pages/         — route-level components
  components/    — presentational + small interactive components
  test/          — Vitest unit + component tests, plus setup.ts
```

Routes:

- `/` → `ProjectListPage`
- `/projects/:projectId` → `ProjectDetailPage`

Rules:

- Put shared types in `src/types/`.
- Put LocalStorage access only in `src/data/`.
- Put route-level components in `src/pages/`.
- Put reusable UI pieces in `src/components/`.
- Put hook logic in `src/hooks/`.
- Put tests and test setup in `src/test/`.
- Do not create new top-level folders unless the current structure clearly cannot support the task.

---

## 4. Do-Not-Touch Zones

<!--
Why this section exists:
These files are load-bearing. A casual AI edit here can ripple through the app and make the diff harder to review. Claude must pause before changing them.
-->

Do not modify these areas without an explicit ask:

1. `src/data/storage.ts`

   This is the storage adapter. It is intentionally small and is the seam for a future Supabase or backend swap.

   Do not inline `localStorage` calls anywhere else in the app.

2. `src/types/index.ts`

   This contains shared types and the `TASK_STATUSES` / `RISK_LEVELS` const tuples.

   Changing a type ripples through repos, hooks, and components.

3. Repo function signatures in `src/data/*Repo.ts`

   Hooks and components are written against these signatures.

   Add new functions rather than reshaping existing ones unless the user approves the change.

4. `vite.config.ts`, `vitest.config.ts`, and `tsconfig*.json`

   These are tooling files. Leave them alone unless the user asks for a tooling change.

5. `.env*` files

   Do not create, edit, or commit secrets.

If a task appears to require changing one of these zones, stop and say:

**STOP, escape hatch triggered.**

Then explain:

1. Which file needs to change.
2. Why the change is needed.
3. What could break.
4. What you recommend doing next.

Wait for direction before editing.

---

## 5. Escape Hatch

<!--
Why this section exists:
Without an explicit stop phrase, Claude may guess. The escape hatch creates a visible pause before risky changes.
-->

Use this exact phrase when risk or uncertainty crosses a boundary:

**STOP, escape hatch triggered.**

Trigger the escape hatch when:

- A task touches a do-not-touch zone.
- A task would add auth, database, payments, deploys, analytics, or multi-user features.
- A task would introduce a new dependency.
- A task would weaken TypeScript safety.
- A task would delete or weaken tests to make code pass.
- A task would change shared types.
- A task would change persistence behavior.
- A task would require a new top-level folder, route, or data collection.
- A task is ambiguous and multiple reasonable approaches exist.
- A task could make the project harder to use as a public-safe lab.

After using the phrase:

1. Explain the issue.
2. List the options.
3. Recommend one option.
4. Wait for the user.

Do not guess.
Do not proceed silently.
Do not make destructive changes without confirmation.

---

## 6. Code Change Rules

<!--
Why this section exists:
AI-generated code can become broad fast. This section keeps changes small, reviewable, and useful for future content.
-->

When changing code:

- Make the smallest change that solves the task.
- Prefer boring, readable code over clever code.
- Do not rewrite a file just to improve style.
- Do not rename files, functions, or variables unless needed for the task.
- Do not mix refactoring with feature work unless asked.
- Preserve existing behavior unless the task explicitly changes it.
- Preserve existing public function signatures unless the change is approved.
- Keep changes easy to explain in a PR.
- If a change touches more than 3 files, explain the plan before editing.
- If a change touches more than 6 files outside `src/test/`, recommend splitting the work.

Before editing, identify:

1. Files expected to change.
2. Files that should not change.
3. Tests that should be added or updated.
4. Risk level: low, medium, or high.

---

## 7. Testing Rules

<!--
Why this section exists:
AI-generated code often defers tests or weakens assertions. This project exists to test AI workflows, so test behavior is part of the artifact.
-->

Testing expectations:

- All new behavior in `src/data/` must have a unit test in `src/test/`.
- New component behavior should have a component test when practical.
- Use Testing Library queries by role or label:
  - `getByRole`
  - `getByLabelText`
  - `findByRole`
  - `findByLabelText`
- Do not query by class name.
- Do not use `data-testid` unless there is no accessible alternative.
- Do not mock the data layer in unit tests.
- The repos are small and call real `localStorage`.
- `src/test/setup.ts` clears `localStorage` between tests. That is the isolation boundary.
- Run `npm test` before considering a task done.
- A green test suite is part of “done.”

If a test fails:

1. Explain the failing test.
2. Explain whether the code or the test is wrong.
3. Fix the code first.
4. Only update the test if the expected behavior intentionally changed.
5. Do not delete the test to make the suite pass.
6. Do not weaken assertions to hide a real bug.

---

## 8. Dependency Rules

<!--
Why this section exists:
Claude may add libraries when a small local function would be better. This lab should stay boring and easy to inspect.
-->

Do not add a new dependency without approval.

If you think a dependency is needed, stop and explain:

1. What problem it solves.
2. Why the current stack cannot solve it.
3. The maintenance cost.
4. The smaller alternative.

Prefer:

- Existing project dependencies
- Small local utilities
- Browser APIs
- Simple React patterns

Avoid adding dependencies for:

- Small formatting helpers
- Simple state management
- One-off UI behavior
- Small date utilities
- Anything that makes the lab feel more like a product than a testing repo

---

## 9. Commit Rules

<!--
Why this section exists:
This repo is a content source. Clean commits make the project easier to review, explain, and turn into future patterns.
-->

Use short conventional-style prefixes:

- `feat:`
- `fix:`
- `refactor:`
- `test:`
- `chore:`
- `docs:`

Rules:

- Subject line stays under about 70 characters.
- Subject line describes the change in plain language.
- Body, when needed, explains why, not what.
- One logical change per commit.
- Do not bundle a refactor with a feature.
- Do not commit secrets, `.env` files, private screenshots, or anything not safe to publish.
- Do not commit generated files unless they belong in the repo.

Avoid vague commit messages:

- `update files`
- `fix stuff`
- `changes`
- `cleanup`

---

## 10. PR Description Rules

<!--
Why this section exists:
AI-assisted work needs review context. This format forces risk, tests, and manual review areas into the PR description.
-->

Every PR description should contain:

```md
## Summary

- [What changed]
- [Why it changed]

## Why

[Motivation for the change. Link to a content idea, issue, or note if relevant.]

## Files changed

- `[file]` — [why it changed]
- `[file]` — [why it changed]

## Test plan

- [ ] [Command run]
- [ ] [Manual check]

## Risk

Low / Medium / High

Reason:
[What could break?]

## Manual review checklist

- [ ] Types are safe.
- [ ] Tests cover the changed behavior.
- [ ] No do-not-touch zones were modified without approval.
- [ ] No unrelated files were changed.
- [ ] No scope creep was introduced.
- [ ] No private or employer-related content was added.

## AI-assisted?

Yes / No

If yes:
[Briefly describe where AI helped and what was manually reviewed.]
```

Keep PRs small.

If a PR touches more than about 6 files outside `src/test/`, consider splitting.

---

## 11. Documentation Rules

<!--
Why this section exists:
The repo is also a public proof layer for The Last Sprint. Documentation should explain decisions and tradeoffs, not repeat obvious code.
-->

Update documentation when:

- A new pattern is introduced.
- A setup step changes.
- A public function or shared type changes.
- A do-not-touch zone changes.
- A workflow changes.
- A repeated instruction becomes a Skill candidate.
- A failed experiment changes the CLAUDE.md.

Do not add comments that only repeat the code.

Good comments explain:

- Why this exists.
- What tradeoff was chosen.
- What should not be changed casually.
- What future change this makes easier.

---

## 12. Content Safety Rules

<!--
Why this section exists:
This lab exists partly for public content. The content boundary must be explicit so examples stay safe to publish.
-->

Never include:

- Employer code
- Employer architecture
- Employer names
- Client names
- Real customer data
- Private screenshots
- API keys
- Tokens
- Passwords
- Private URLs
- Proprietary business logic
- Anything copied from work

Use only:

- Public-safe examples
- Synthetic data
- Code written specifically for this lab
- Open-source references where the license allows it

If a task appears to require private information, stop and say:

**STOP, escape hatch triggered.**

Then explain what information is needed and how to proceed safely.

---

## 13. When To Ask vs. When To Proceed

<!--
Why this section exists:
The cost of one clarifying question is lower than the cost of a wrong AI edit in a repo meant to produce clean public examples.
-->

Proceed without asking when:

- The user gave a clear, scoped task.
- The change fits inside an existing layer: types, data, hooks, components, pages, or test.
- No do-not-touch zone is involved.
- No new dependency is needed.
- You are adding a test for existing behavior.
- You are fixing a clear bug with an obvious root cause.
- You are improving a small piece of code clearly inside the requested task.

Ask first when:

- The change touches a do-not-touch zone.
- The change adds a new dependency.
- The change changes shared types.
- The change changes persistence behavior.
- The change requires a new top-level folder, route, or data collection.
- The task is ambiguous.
- The task pulls in scope the user did not mention.
- You are about to delete files.
- You are about to remove tests.
- You are not sure whether something belongs in this lab project.

When asking, include:

1. The decision needed.
2. The options.
3. The tradeoff.
4. Your recommendation.

---

## 14. Final Check Before Calling A Task Done

<!--
Why this section exists:
Code compiling is not enough. This project is for testing AI-assisted workflows, so verification must be explicit.
-->

Before saying a task is complete, check:

- The requested behavior was implemented.
- The change stayed within scope.
- No do-not-touch zones were changed without approval.
- No product-shaped scope creep was introduced.
- Types are safe.
- Tests were added or updated when needed.
- Existing tests were not weakened.
- Code is readable.
- No new dependency was added without approval.
- No unrelated files were changed.
- No private or employer-related content was added.
- The final response explains what changed and how it was verified.

If verification was not run, say so clearly.
