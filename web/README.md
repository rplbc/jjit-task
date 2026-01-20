# Web App

Next.js app.

## Prereqs

- Node.js 20+
- pnpm

## Run

```bash
pnpm -C web install
NEXT_PUBLIC_API_URL=http://localhost:5189 pnpm -C web dev
```

`http://localhost:3000`

## Build / Start

```bash
pnpm -C web build
pnpm -C web start
```

## Env

- `NEXT_PUBLIC_API_URL` (required for dev/build)

## Docker

```bash
docker build -t pokemon-web .
```

```bash
docker build -t pokemon-web --build-arg NEXT_PUBLIC_API_URL=http://localhost:5189 .
```
