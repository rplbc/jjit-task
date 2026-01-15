# Task

Build a web app with a trainer registration form: trainer name + age + 1 starter Pokemon.

## Details

### Frontend

- Next.js (App Router) + TypeScript.
- Load and use IBM VGA font everywhere.
- Date/time in top-right: fetched server-side only once on page entry.
- Client-side form validation (per Figma).
- Pokemon name: autocomplete that calls `/api/search?q=...`, with debounce + cache; on select fetch Pokemon preview from backend.
- Submit behavior:
  - invalid -> show field errors, do not submit
  - valid -> show "Sukces!" modal + reset button
  - backend error handling can be minimal (do nothing or alert)
- Reset resets whole form.
- Should work at least in Firefox/Chrome and connect to backend.

### Backend

- .NET Minimal API.
- Use `pokemon.json` as the only data source (no DB).
- Fuzzy suggestions: FuzzySharp.
- NTP time: Yort.Ntp (e.g., time.google.com).
- Cache Pokemon API calls to avoid repeated requests.
- Serve Swagger or Scalar docs page for endpoints.
- Runnable at least on Linux or via Docker.

#### Endpoints

- `GET /api/time` -> current time from configured NTP server.
- `GET /api/search?q=<text>` -> list of Pokemon suggestions (fuzzy search over `pokemon.json`).
- `GET /api/pokemon?id=<id>` -> Pokemon details by id (fetch from Pokemon API, map to your DTO).
- `POST /api/trainer` -> validate fields, return `201 Created` if OK, else `400 Bad Request`.
