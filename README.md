# Trainer Registration App

A Next.js frontend and .NET minimal API for registering Pokemon trainers. It fetches NTP time server-side, offers fuzzy search over local Pokemon data, and caches PokeAPI lookups.

## Contents

- `api/` - .NET minimal API (endpoints, services, test project)
- `web/` - Next.js app (App Router, MUI, form flow)

## Prerequisites

Docker path:
- Docker Desktop (or Docker Engine + Compose)

Local dev path:
- .NET SDK 10
- Node.js 20+
- pnpm

## Quickstart

### Docker (recommended)

```bash
docker compose up --build
```

Then open:
- Web: `http://localhost:3000`
- API: `http://localhost:5189`
- API docs: `http://localhost:5189/openapi` (Scalar UI available at runtime)

### Local dev

API:
```bash
dotnet run --project api/src/PokemonApi
```

Web:
```bash
pnpm -C web install
NEXT_PUBLIC_API_URL=http://localhost:5189 pnpm -C web dev
```

## Testing

API:
```bash
dotnet test api/tests/PokemonApi.Tests/PokemonApi.Tests.csproj
```

## Docs

- API details: `api/README.md`
- Web details: `web/README.md`
