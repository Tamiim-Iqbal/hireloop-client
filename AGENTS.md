<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hireloop client

Next.js 16.4.4 App Router + React 19 + Tailwind CSS v4 (PostCSS), with shadcn/ui and Better Auth on MongoDB.

## Commands

- Use npm (`package-lock.json`); do not switch to pnpm/yarn.
- Validate with `npm run lint`, then `npm run typecheck`, then `npm run build`.
- There is no test runner or test script. Do not invent test commands.
- `npm run format` rewrites all `*.ts`/`*.tsx` (Prettier + Tailwind class sorting).

## Layout

- `app/` — routes, root layout, and page-level components (`app/components/Hero.tsx`, `Navbar.tsx`). `app/page.tsx` renders `<Hero />`.
- `components/ui/` — shadcn primitives; `components/` — app-wide components (`theme-provider.tsx`).
- `lib/auth.ts` / `lib/auth-client.ts` — Better Auth server/client instances.
- `@/*` maps to the repo root, so imports look like `@/app/components/Hero`, `@/components/ui/button`, `@/lib/utils`.

## Conventions that differ from defaults

- This shadcn setup uses the `base-nova` style and `@base-ui/react`, not Radix. `Button` is a Base UI primitive: compose links with `render={<Link href="..." />}`, **not** `asChild`.
- Add UI primitives with `npx shadcn@latest add <name>`; do not hand-copy components from another style.
- `cn` comes from the `cn` npm package. `lib/utils.ts` only re-exports it, and `components/ui/button.tsx` imports `cn` directly from `"cn"`. Do not introduce `clsx`/`tailwind-merge`.
- Tailwind v4 has no `tailwind.config.*`; theme tokens live in `app/globals.css` via `@theme` and CSS variables. Prefer semantic classes (`bg-background`, `text-muted-foreground`).
- Prettier: no semicolons, double quotes, 2-space indent, 80 columns. Run `npm run format` rather than hand-formatting.
- `app/layout.tsx` wraps everything in `ThemeProvider` (client boundary) and `Navbar`; `d` toggles dark mode. Keep server components as the default and add `"use client"` only when needed.

## Auth / database gotchas

- Better Auth is mounted at `app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`.
- `lib/auth.ts` hardcodes `mongodb://localhost:27017/database` and database `hireloop`. Local MongoDB must be running for auth to work.
- Required env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. `.env` is gitignored and currently only has the first two, so Google sign-in stays disabled until the OAuth credentials are added.
- `lib/auth-client.ts` reads `process.env.BETTER_AUTH_URL` in browser code. Next only inlines `NEXT_PUBLIC_*` variables into the client bundle, so this value is likely `undefined` in the browser; prefer a `NEXT_PUBLIC_` URL or an explicit `baseURL` when touching auth client code.
