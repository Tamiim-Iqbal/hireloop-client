# Hireloop Client Guidelines

## Build, lint, and format

Install dependencies with `npm install`.

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs ESLint with the Next.js Core Web Vitals and TypeScript configurations.
- `npm run typecheck` runs `tsc --noEmit` with strict TypeScript checking.
- `npm run format` formats TypeScript and TSX files with Prettier and the Tailwind CSS plugin.

There is currently no test script or test runner configured, so there is no single-test command. Do not invent a test command; use `npm run lint`, `npm run typecheck`, and `npm run build` to validate changes until a test framework is added.

## Architecture

- This is a Next.js 16 App Router application. Route entry points and layouts live under `app/`; `app/layout.tsx` provides the global metadata shell, Geist fonts, global CSS, and the theme provider.
- Components are split between reusable application components in `components/` and shadcn/ui-style primitives in `components/ui/`. Add new generated UI primitives through the shadcn CLI rather than hand-copying a different component style.
- React Server Components are the default. Add `"use client"` only to components that need browser state, effects, event handlers, or client-only packages. The current theme provider is the client boundary and wraps the server-rendered page from the root layout.
- Styling uses Tailwind CSS v4 through `app/globals.css`, with `tw-animate-css`, shadcn CSS variables, and light/dark theme tokens. The PostCSS integration is in `postcss.config.mjs`; there is no Tailwind config file.

## Conventions

- Use the `@/*` path alias for repository imports, for example `@/components/ui/button` and `@/lib/utils`.
- Follow the shadcn configuration in `components.json`: `base-nova` style, neutral CSS-variable theme, Lucide icons, and the aliases for `components`, `ui`, `lib`, and `hooks`.
- Build UI variants with `class-variance-authority` and merge classes with the shared `cn` helper. Keep reusable styling in component variants instead of duplicating long Tailwind class strings at call sites.
- Use the existing `Button` primitive from `components/ui/button.tsx` for buttons. It wraps `@base-ui/react/button`, supports the established `variant` and `size` APIs, and exposes `data-slot="button"`.
- Keep global colors, radii, typography, and dark-mode behavior in the CSS variables in `app/globals.css`. Prefer semantic classes such as `bg-background`, `text-foreground`, `border-border`, and `text-muted-foreground` over hard-coded colors.
- Preserve the current formatting rules from `.prettierrc`: two-space indentation, no semicolons, double quotes, trailing commas where valid, 80-column print width, and Tailwind class sorting.
- Preserve the managed Next.js block in `AGENTS.md`. Before changing Next.js-specific behavior, consult the relevant installed guide under `node_modules/next/dist/docs/` because this project’s Next.js version may differ from common training examples.
