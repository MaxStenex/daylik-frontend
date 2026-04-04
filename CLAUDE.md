<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Daylik Frontend — Project Rules


## Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS v4 (latest: 4.2.2)
- **UI Components**: Shadcn UI (New York style)
- **State**: Zustand (client state) + TanStack Query v5 (server state)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Architecture

Feature-based structure — each feature is self-contained:

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── (auth)/             # Auth route group
│   ├── (dashboard)/        # Main app route group
│   └── globals.css
├── features/               # Feature modules (core architecture unit)
│   └── habits/
│       ├── api/            # API calls (fetch wrappers / TanStack Query hooks)
│       ├── components/     # Feature-specific components
│       ├── hooks/          # Feature-specific hooks
│       ├── store/          # Zustand slices for this feature
│       ├── types.ts        # Feature types
│       └── index.ts        # Public API — only import from this file outside the feature
├── components/
│   ├── ui/                 # Shadcn primitives (auto-generated, do not edit)
│   └── shared/             # Reusable app-level components (not feature-specific)
├── hooks/                  # Global hooks (useMediaQuery, useDebounce, etc.)
├── lib/                    # Utilities, API client, constants
│   ├── api.ts              # Base fetch/axios client
│   ├── utils.ts            # cn() and other helpers
│   └── constants.ts
├── store/                  # Global Zustand store (cross-feature state only)
└── types/                  # Global TypeScript types & interfaces
```

### Key rules
- **Feature boundary**: never import from `features/X/components` directly from another feature — use the feature's `index.ts` barrel.
- **Server vs Client**: prefer React Server Components by default; add `"use client"` only when needed (interactivity, browser APIs, hooks).
- **Data fetching**: server components fetch directly; client components use TanStack Query hooks defined in `features/*/api/`.
- **No barrel re-exports** outside of `features/*/index.ts` — avoids circular deps and slow bundling.

## Code Style
- Functional components only, no class components.
- Named exports everywhere (no default exports except Next.js pages/layouts).
- Props interfaces named `[ComponentName]Props`.
- Avoid `any` — use `unknown` and narrow with type guards.
- Prefer `const` arrow functions for components: `const Foo = () => {}`.
- Keep components under ~150 lines; extract sub-components or hooks when bigger.
- Collocate types with their consumers unless shared across features.

## Naming Conventions
- Files/folders: `kebab-case`
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Types/Interfaces: `PascalCase`
- Zustand stores: `useCamelCaseStore`
- Constants: `SCREAMING_SNAKE_CASE`

## Shadcn
- Run `npx shadcn@latest add <component>` to add components — never write them manually.
- Components land in `src/components/ui/` — do not edit them directly; wrap or extend instead.

## Environment
- `.env.local` for local secrets, never committed.
- All env vars exposed to client must be prefixed `NEXT_PUBLIC_`.
- Type env vars in `src/types/env.d.ts`.

## Testing (when added)
- Unit tests: Vitest
- Component tests: React Testing Library
- Test files colocated: `foo.test.ts` next to `foo.ts`

## Git
- Branch naming: `feat/`, `fix/`, `chore/` prefixes.
- Commit style: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`).


## Backend Reference

The backend lives at `../daylik` (sibling folder). Always consult these files before building any feature or API integration:

- `../daylik/api/openapi.yaml` — authoritative API spec (endpoints, request/response shapes)
- `../daylik/docs/PRODUCT.md` — product requirements, domain concepts, and feature definitions

When the OpenAPI spec and PRODUCT.md conflict, the spec is ground truth for what is implemented. Features in PRODUCT.md without a matching endpoint don't exist in the API yet.