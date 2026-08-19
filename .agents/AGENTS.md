# AGENTS.md - Agent Context for Comptasse

## Developer Commands

```bash
# Dev environment (requires Docker, just)
just dev up          # Start all services: website (5173), API (3000), DB, RustFS
just dev down       # Stop services
just dev reset     # Reset database

# CI build (used in PR checks)
just build         # Runs: lint → typecheck → test → build

# Per-package commands (pnpm filters)
pnpm --filter @comptasse/application-api exec tsc --noEmit         # TypeScript check API
pnpm --filter @comptasse/website exec tsc --noEmit  # TypeScript check website
pnpm --filter @comptasse/application-metadata exec tsc --noEmit    # TypeScript check metadata
pnpm check        # Biome lint + format check
pnpm check:fix  # Biome lint + format fix --write
pnpm build       # Build all packages
```

## Monorepo Structure

| Package | Role | Key Technologies |
|---------|------|-----------------|
| `packages/api` | Backend REST API | Hono, Drizzle ORM, PostgreSQL |
| `packages/website` | Frontend webapp | React, TanStack Router, Panda CSS |
| `packages/dashboard` | Authenticated dashboard SPA | React, TanStack Router, TanStack Query |
| `packages/metadata` | Shared schemas/types | Valibot, Drizzle ORM models |
| `packages/ui` | Shared UI components | React, Panda CSS |
| `packages/tools` | DB migrations/seeds | Drizzle, CLI |

**Entrypoints:**
- API: `packages/api/src/server.ts`
- Website: `packages/website/src/main.tsx`
- Dashboard: `packages/dashboard/src/main.tsx`

## Architecture Patterns

### Route definition → API → Frontend flow
1. Define schema + route in `packages/metadata/src/routes/`
2. Implement handler in `packages/api/src/routes/auth/` or `packages/api/src/routes/public/`
3. Consume via `useDataFromAPI` hook or `getResponseBodyFromAPI` in website or dashboard

### Agentic usage (external)
- Comptasse does not ship a built-in AI agent
- Users bring their own agent and interact with Comptasse via the REST API or CLI
- API authentication is cookie-based (dashboard) or via user-level API keys

## Code Conventions

- **Indentation**: 4 spaces
- **Quotes**: double quotes
- **Trailing commas**: all
- **Import ordering**: alphabetical (Biome enforces this)
- **CSS**: Use `css()` from `@comptasse/ui/utilities/cn.js` with Panda CSS tokens
- **Validation**: Valibot schemas in `packages/metadata/src/schemas/`
- **Database**: Drizzle ORM in `packages/metadata/src/models/`

## Important Gotchas

- **Biome import sorting**: Run `pnpm check:fix` before committing - imports must be alphabetical
- **TypeScript**: After modifying metadata package, rebuild with `pnpm --filter @comptasse/application-metadata build` before API/website checks pass
- **Database**: Migrations live in `packages/tools/src/migrations/`, run via `pnpm --filter @comptasse/application-tools` commands

## References

- [Development guide](docs/DEVELOPMENT.md)
- [Architecture overview](docs/ARCHITECTURE.md)
- [Configuration](docs/CONFIGURATION.md)