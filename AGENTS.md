# AGENTS.md — Agent Context for Arrhes

## Developer Commands

```bash
# Dev environment (requires Docker, just)
just dev up          # Start all services: website (5173), API (3000), DB, mailpit, RustFS
just dev down       # Stop services
just dev reset     # Reset database

# CI build (used in PR checks)
just build         # Runs: lint → typecheck → test → build

# Per-package commands (pnpm filters)
pnpm --filter @arrhes/application-api exec tsc --noEmit         # TypeScript check API
pnpm --filter @arrhes/application-website exec tsc --noEmit  # TypeScript check website
pnpm --filter @arrhes/application-metadata exec tsc --noEmit    # TypeScript check metadata
pnpm check        # Biome lint + format check
pnpm check:fix  # Biome lint + format fix --write
pnpm build       # Build all packages
```

## Monorepo Structure

| Package | Role | Key Technologies |
|---------|------|-----------------|
| `packages/api` | Backend REST API | Hono, Drizzle ORM, PostgreSQL |
| `packages/website` | Frontend webapp | React, TanStack Router, Panda CSS |
| `packages/metadata` | Shared schemas/types | Valibot, Drizzle ORM models |
| `packages/ui` | Shared UI components | React, Panda CSS |
| `packages/tools` | DB migrations/seeds | Drizzle, CLI |

**Entrypoints:**
- API: `packages/api/src/server.ts`
- Website: `packages/website/src/main.tsx`

## Architecture Patterns

### Route definition → API → Frontend flow
1. Define schema + route in `packages/metadata/src/routes/`
2. Implement handler in `packages/api/src/routes/auth/` or `packages/api/src/routes/public/`
3. Consume via `useDataFromAPI` hook or `getResponseBodyFromAPI` in website

### Agent (AI chat)
- Two-pass: Pass 1 (router) classifies intent → Pass 2 (executor) runs LLM with tools
- Uses `@tanstack/ai` with AG-UI protocol over SSE
- Sessions stored in `table_agent_session`, messages in `table_agent_message`

## Code Conventions

- **Indentation**: 4 spaces
- **Quotes**: double quotes
- **Trailing commas**: all
- **Import ordering**: alphabetical (Biome enforces this)
- **CSS**: Use `css()` from `@arrhes/ui/utilities/cn.js` with Panda CSS tokens
- **Validation**: Valibot schemas in `packages/metadata/src/schemas/`
- **Database**: Drizzle ORM in `packages/metadata/src/models/`

## Important Gotchas

- **Biome import sorting**: Run `pnpm check:fix` before committing — imports must be alphabetical
- **TypeScript**: After modifying metadata package, rebuild with `pnpm --filter @arrhes/application-metadata build` before API/website checks pass
- **Database**: Migrations live in `packages/tools/src/migrations/`, run via `pnpm --filter @arrhes/application-tools` commands
- **Agent streaming**: Server uses SSE (`toServerSentEventsResponse`), client uses `@tanstack/ai-react` `useChat` with `onCustomEvent` for session-created events

## References

- [Development guide](docs/DEVELOPMENT.md)
- [Architecture overview](docs/ARCHITECTURE.md)
- [Configuration](docs/CONFIGURATION.md)