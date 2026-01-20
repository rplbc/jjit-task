# Trainer Registration App

Next.js frontend and .NET 10 API.

## Repo

- `api/` .NET API
- `web/` Next.js app

## Prereqs

- Docker Desktop (or Engine + Compose)
- .NET SDK 10
- Node.js 20+
- pnpm

## Run (Docker)

```bash
docker compose up --build
```

- Web: `http://localhost:3000`
- API: `http://localhost:5189`
- API docs (Development only): `http://localhost:5189/openapi`

## Run (Local)

```bash
dotnet run --project api/src/PokemonApi
```

```bash
pnpm -C web install
NEXT_PUBLIC_API_URL=http://localhost:5189 pnpm -C web dev
```

## Test

```bash
dotnet test api/tests/PokemonApi.Tests/PokemonApi.Tests.csproj
```

## More

- `api/README.md`
- `web/README.md`
