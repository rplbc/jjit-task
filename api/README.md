# Pokemon API

.NET minimal API for trainer registration and Pokemon lookups. It reads `pokemon.json` for fuzzy search suggestions and calls PokeAPI for details with memory caching.

## Prerequisites

- .NET SDK 10

## Run

```bash
dotnet run --project api/src/PokemonApi
```

Default address: `http://localhost:5189`

## Configuration

Environment variables:
- `ASPNETCORE_ENVIRONMENT`: `Development` enables OpenAPI/Scalar UI.
- `NtpServer`: NTP host (default: `time.google.com`).

Docs:
- OpenAPI JSON: `http://localhost:5189/openapi`
- Scalar UI: `http://localhost:5189/scalar/v1`

## Endpoints

Request/response contracts are simple JSON. Key routes:

- `GET /api/time` -> current time from NTP server.
- `GET /api/search?q=<text>` -> fuzzy search suggestions from `pokemon.json`.
- `GET /api/pokemon?id=<id>` -> Pokemon details from PokeAPI (cached).
- `POST /api/trainer` -> validates and returns `201 Created` with trainer data.

## Tests

```bash
dotnet test api/tests/PokemonApi.Tests/PokemonApi.Tests.csproj
```

## Docker

Build and run (from repo root):

```bash
docker build -f api/src/PokemonApi/Dockerfile -t pokemon-api api/src/PokemonApi
docker run -p 5189:5189 -e ASPNETCORE_ENVIRONMENT=Production pokemon-api
```

Compose (from repo root):

```bash
docker compose build api
docker compose up api
```
