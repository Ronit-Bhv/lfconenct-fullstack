# Meeting Basum

A meeting scheduling and management application built with React + Vite.

## Project Structure

```
meeting-basum/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── context/         # Context API — user/session state
│   │   ├── store/           # Global store — meetings data
│   │   ├── components/      # Shared UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── styles/          # CSS modules per page/component
│   │   └── data/            # Seed data reference
│   ├── public/
│   ├── Dockerfile           # Multi-stage Docker build (nginx serve)
│   ├── nginx.conf           # SPA routing config for nginx
│   └── index.html
├── server/                  # Node.js / TypeScript API (placeholder)
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── .dockerignore
├── netlify.toml             # Netlify build + SPA redirect config
└── README.md
```

## Running the App (Dev)

```bash
npm install
npm run dev      # Vite dev server — serves from client/ at localhost:5173
```

---

## Docker — Build & Run

> Run all commands from the **repo root** (`meeting-basum/`).

### Build the image

```bash
docker build -f client/Dockerfile -t meeting-basum .
```

- `-f client/Dockerfile` — Dockerfile location inside the repo
- `-t meeting-basum` — image name/tag
- `.` — build context is the repo root (required so `COPY package.json` and `COPY client/` resolve correctly)

### Run the image

```bash
docker run -p 8080:80 meeting-basum
```

Open **http://localhost:8080** in your browser.

- Port `80` inside the container (nginx) is mapped to `8080` on your machine.
- No source-code mounts are needed — assets are baked into the image at build time.

### What happens inside the Dockerfile

| Stage | Base image | What it does |
|---|---|---|
| `build` | `node:20-alpine` | Installs deps with `npm ci`, runs `vite build` → outputs to `/app/dist` |
| `serve` | `nginx:1.27-alpine` | Copies `/app/dist` to nginx's web root; uses `client/nginx.conf` for SPA routing |

The nginx SPA config (`client/nginx.conf`) uses `try_files $uri $uri/ /index.html` so any deep route (e.g. `/calendar`, `/meetings/1/details`) falls back to `index.html` and React Router handles it client-side.

---

## Netlify Deployment

### Live URL

🌐 **https://meeting-basum.netlify.app**

### How it was deployed

```bash
# 1. Install Netlify CLI (one-time)
npx netlify-cli login

# 2. Create a new Netlify site (one-time)
npx netlify-cli sites:create --name "meeting-basum"

# 3. Deploy to production
npx netlify-cli deploy --prod --dir dist
```

Netlify runs `npm run build` (from `netlify.toml`) automatically on each deploy, so step 3 re-builds and uploads in a single command.

### netlify.toml settings explained

```toml
[build]
  command = "npm run build"   # Vite build (root: ./client, outDir: ../dist)
  publish = "dist"            # Folder Netlify reads — repo-root/dist

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200                # 200 (not 301) — serve index.html for every route
```

The `[[redirects]]` rule is the **SPA fallback**: refreshing on a deep URL like `/calendar` returns `index.html` with HTTP 200 instead of Netlify's 404 page, so React Router takes over.

### Build settings (if connected via GitHub)

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` (set in `netlify.toml`) |

---

## State Architecture

### Context API — `UserContext`

**File:** `client/src/context/UserContext.jsx`

Stores **user/session-level state**: display name, initials, email, and theme preference.

```jsx
const { user, updateUser } = useUser();
```

**Used by:** `Layout` (header avatar + footer name), `Dashboard` (greeting), `ProfileSettings` (edit form), `NewMeeting` (pre-fills host field).

**Why Context here?**
- The value is stable across the session (changes only when the user edits their profile).
- It needs to be available from the very top of the tree down to deeply nested components — Context's natural use-case.
- React re-renders triggered by a name/theme change are infrequent enough that the cost is negligible.

---

### Global Store — `meetingStore`

**File:** `client/src/store/meetingStore.js`

Stores **meetings data** and exposes named actions (`addMeeting`, `removeMeeting`, `updateMeeting`). Implemented as a **Zustand-style module singleton** using React's built-in `useSyncExternalStore` — no external library required.

```js
const { meetings } = useMeetingStore();
const upcomingCount = useUpcomingCount();  // derived state
meetingActions.addMeeting({ title, host, time, color });
```

**Used by:** `Dashboard` (list + delete), `Calendar` (chip list), `MeetingDetail` (find by id), `MeetingDetailsTab` (display), `MeetingParticipantsTab` (host name).

**Why a store here?**
- Meetings are read from multiple independent routes simultaneously.
- Multiple routes also *write* to the same list (`ScheduleMeeting`, `NewMeeting`, `Dashboard` delete).
- A module-level singleton avoids prop-drilling and eliminates the "every Context update re-renders all consumers" problem that you'd get if meetings were in a Context.
- Named actions (`addMeeting`, `removeMeeting`) make write operations discoverable and auditable.

**Derived state:** `useUpcomingCount()` is a separate hook backed by `useSyncExternalStore` that returns only the meeting count. It re-renders only when the count changes, not on every unrelated store update.

---

### Local State

UI-only state stays in component `useState` and is **never promoted to the store**:

| Component | Local state | Why kept local |
|---|---|---|
| `JoinMeeting` | Meeting code input | Never persisted; discarded on navigation |
| `ScheduleMeeting` | All form fields | Transient input — only the result goes to the store on submit |
| `NewMeeting` | Title field | Same as above |
| `ProfileSettings` | Form fields | Shadow the Context value; only written back on save |
| `Calendar` | View toggle (month/week) | URL (`useSearchParams`) — transient UI preference |

---

## Context vs Global Store — Decision Note

| Criterion | Context API | Global Store |
|---|---|---|
| Data changes frequently? | No (session-stable) | Yes (add/remove/update) |
| Written from multiple routes? | No | Yes |
| Needs named actions / mutations? | No | Yes |
| Re-render cost of updates? | Low (rare writes) | Contained (only subscribers re-render) |
| Natural scope | Whole-app session data | Shared domain data with CRUD |

**Rule of thumb used here:**  
Use **Context** when the value is session-scoped and mutates rarely (user identity, theme).  
Use the **store** when multiple routes read *and* write the same data and you need a clear set of named actions.

---

## TypeScript Server (Assignment C)

### Running the server

```bash
cd server
npm install
npm run dev          # tsx watch — hot-reloads on file changes
```

Server starts on **http://localhost:3001**. Boot output:

```
🚀 Meeting Basum API
   Port : http://localhost:3001
   Env  : development
   Boot : 2026-06-07T...
```

### Endpoints

| Method | Path | Status | Description |
|---|---|---|---|
| `GET` | `/health` | 200 | Health check — uptime, boot time |
| `GET` | `/meetings` | 200 | List all meetings |
| `POST` | `/meetings` | 201 | Create a meeting |
| `POST` | `/meetings` | 400 | Validation failed (missing fields or bad color) |
| `POST` | `/meetings` | 400 | Malformed JSON body |
| Any | `/*` | 404 | Unknown route |

**Example — create a meeting:**

```bash
curl -X POST http://localhost:3001/meetings \
  -H "Content-Type: application/json" \
  -d '{"title":"Design Review","host":"Ronit","time":"Fri 3pm","color":"#ec4899"}'
# → 201 {"data":{"id":4,"title":"Design Review",...},"message":"Meeting created","timestamp":"..."}
```

**Example — validation error:**

```bash
curl -X POST http://localhost:3001/meetings \
  -H "Content-Type: application/json" \
  -d '{"host":"Alice"}'
# → 400 {"error":"Validation failed","details":"Missing required field(s): title, time","timestamp":"..."}
```

### TypeScript types used

**`interface Meeting`** (`src/types.ts`) — the domain object stored in memory and returned by the API. Chosen because it's an extensible named object shape (`CreateMeetingBody` extends it by omission).

**`type MeetingColor`** (`src/types.ts`) — a union of five allowed hex strings (`'#6366f1' | '#22c55e' | ...`). Chosen because a union of literals cannot be expressed as an `interface`.

**`type ApiResponse<T>`** and **`type ApiError`** — generic envelope types wrapping every response so consumers always get `{ data, message, timestamp }` or `{ error, details, timestamp }`.

### Logger middleware — terminal output

Every request is logged after the response is sent:

```
[2026-06-07T01:40:00.000Z] GET    /health              200  (5ms)
[2026-06-07T01:40:01.000Z] POST   /meetings            201  (1ms)
[2026-06-07T01:40:02.000Z] POST   /meetings            400  (0ms)
[2026-06-07T01:40:03.000Z] GET    /unknown             404  (0ms)
```

Status codes are colour-coded: green (2xx), yellow (4xx), red (5xx).

---

### Request lifecycle — `POST /meetings`

Here is the full lifecycle of one request through the server, from TCP connection to JSON response:

```
Client
  │
  │  POST /meetings  HTTP/1.1
  │  Content-Type: application/json
  │  Body: {"title":"Design Review","host":"Ronit","time":"Fri 3pm"}
  ▼
┌─────────────────────────────────────────────────────┐
│  Node.js HTTP server  (app.listen)                  │
│  Receives the raw TCP bytes, parses HTTP headers    │
└────────────────────┬────────────────────────────────┘
                     │ req / res objects created
                     ▼
┌─────────────────────────────────────────────────────┐
│  Middleware 1: express.json()                       │
│  • Reads the request body stream                    │
│  • Parses JSON → req.body = { title, host, time }  │
│  • If malformed → calls next(error) → jsonError     │
│    handler → 400 { error: "Invalid JSON" }          │
└────────────────────┬────────────────────────────────┘
                     │ next()
                     ▼
┌─────────────────────────────────────────────────────┐
│  Middleware 2: requestLogger  (src/logger.ts)       │
│  • Records start timestamp                          │
│  • Registers res.on("finish") listener              │
│  • Does NOT modify req/res                          │
│  • Calls next() immediately                         │
└────────────────────┬────────────────────────────────┘
                     │ next()
                     ▼
┌─────────────────────────────────────────────────────┐
│  Route handler: POST /meetings  (src/index.ts)      │
│  • Destructures req.body: { title, host, time }     │
│  • Validates required fields → missing? → 400       │
│  • Validates optional color → invalid? → 400        │
│  • Builds Meeting object with id, createdAt         │
│  • Pushes to in-memory meetings array               │
│  • res.status(201).json(ok(newMeeting))             │
└────────────────────┬────────────────────────────────┘
                     │ res.json() serialises and flushes
                     ▼
┌─────────────────────────────────────────────────────┐
│  res "finish" event fires                           │
│  requestLogger callback runs:                       │
│  • Reads res.statusCode = 201                       │
│  • Computes duration = Date.now() - startMs         │
│  • Prints: [timestamp] POST /meetings  201  (1ms)   │
└─────────────────────────────────────────────────────┘
                     │
                     ▼
Client receives HTTP 201 with JSON body:
{
  "data":      { "id": 4, "title": "Design Review", ... },
  "message":   "Meeting created",
  "timestamp": "2026-06-07T01:40:01.000Z"
}
```

**Key points:**
- Middleware runs in registration order: `express.json` → `requestLogger` → route handler.
- The logger attaches a `res.on("finish")` listener so it logs *after* the status code is set by the route — not before.
- The route handler is the only place that writes to the in-memory store; it is synchronous and returns immediately.
- If validation fails at any step, the handler calls `res.status(4xx).json(...)` and returns — no further middleware runs.
