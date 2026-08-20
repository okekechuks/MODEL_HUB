# Phase 1 — Desktop Foundation

Phase 1 establishes the application shell and boundaries needed for the later room, provider, Brainstorm, and Assist implementations.

## Included

- PNPM monorepo/workspace structure.
- Electron desktop shell.
- React + Vite renderer.
- Secure preload bridge with `contextIsolation` and `nodeIntegration: false`.
- Shared TypeScript contracts.
- AI provider abstraction without a provider SDK dependency in core application code.
- Minimal Node API service with a `/health` endpoint.
- Structured desktop logging helper.
- Initial CI checks for typecheck, tests, and builds.

## Workspace

```text
apps/desktop       Electron + React desktop client
services/api       Backend service foundation
packages/providers Provider abstraction
packages/shared-types Shared contracts
```

## Validation

Run locally after installing dependencies:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @model-hub/desktop dev
```

Phase 1 intentionally does not implement provider calls, rooms, Brainstorm orchestration, screen capture, or speech recognition yet. Those belong to subsequent phases.
