# Pokemon API

.NET 10 API.

## Prereqs

- .NET SDK 10

## Run

```bash
dotnet run --project api/src/PokemonApi
```

`http://localhost:5189`

## Config

- `ASPNETCORE_ENVIRONMENT` (Development enables `/openapi`)
- `NtpServer` (default: `time.google.com`)

## Endpoints

Base: `/api`

- `GET /api/ntp/time`
- `GET /api/pokemon/search?q=<text>`
- `GET /api/pokemon/pokemon?id=<id>`
- `POST /api/trainer/trainer`

## Docker

```bash
docker build -f api/src/PokemonApi/Dockerfile -t pokemon-api api/src/PokemonApi
docker run -p 5189:5189 -e ASPNETCORE_ENVIRONMENT=Production pokemon-api
```

```bash
docker compose build api
docker compose up api
```
