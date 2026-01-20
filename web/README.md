# Web App

Next.js (App Router) frontend for trainer registration. Fetches server-side time, supports debounced Pokemon search with cached results, and shows a success dialog on submit.

## Prerequisites

- Node.js 20+
- pnpm

## Run

```bash
pnpm -C web install
NEXT_PUBLIC_API_URL=http://localhost:5189 pnpm -C web dev
```

App runs at `http://localhost:3000`.

## Build / Start

```bash
pnpm -C web build
pnpm -C web start
```

## Environment

- `NEXT_PUBLIC_API_URL`: base URL for the API (required).
- `API_URL`: server-only API base URL for SSR/Docker (not exposed to the browser).
