# VELQIVO — Full Project (Backend + Frontend)

Decision-tracking system for Zoho Cliq. This folder contains both halves:

```
velqivo-project/
 ├── backend/    Spring Boot REST API + Postgres (Java)
 └── frontend/   React dashboard (Vite + Tailwind v4)
```

## Requirements

Install the following before running the project:

- Java 17 or newer
- Maven 3.8 or newer
- Node.js 18 or newer and npm
- Docker Desktop or Docker Engine with Docker Compose support
- Available local ports `5432`, `8080`, and `5173`

The backend uses PostgreSQL with these local defaults:

| Setting | Value |
|---------|-------|
| Database | `velqivo` |
| Username | `postgres` |
| Password | `yourpassword` |
| Port | `5432` |

## How to run

Run the following commands from the project root. Keep the backend and frontend terminals open while using the application.

### 1. Start PostgreSQL

For the first run, create the database container:

```bash
docker run --name velqivo-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=velqivo \
  -p 5432:5432 \
  -d postgres:16
```

On later runs, start the existing container:

```bash
docker start velqivo-db
```

### 2. Start the backend

Open Terminal 1:

```bash
cd backend
mvn spring-boot:run
```

The API runs at `http://localhost:8080`. Verify it with:

```bash
curl http://localhost:8080/api/decisions
```

### 3. Start the frontend

Open Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

Do not use `npm run rev`; there is no `rev` script. Use `npm run dev` to start the development server.

### 4. Stop the project

Press `Ctrl+C` in the backend and frontend terminals, then stop PostgreSQL:

```bash
docker stop velqivo-db
```

## Notes on this merge

- Frontend uses **Tailwind CSS v4** (not v3) — npm installed the latest version automatically. This changes two things from the original instructions:
  - `postcss.config.js` uses `"@tailwindcss/postcss"` instead of `"tailwindcss"` as the plugin key
  - `src/index.css` uses `@import "tailwindcss";` instead of the old `@tailwind base/components/utilities;` three-line syntax
  - Both are already set correctly in this merged copy — you don't need to change anything, just know why it looks different from the original instructions if you compare.
- `frontend/src/api/decisions.js` points at `http://localhost:8080/api/decisions`. Update this to your EC2 public IP once you deploy the backend to AWS.

## Next steps (not yet done)

1. Deploy backend to AWS EC2 (Docker Compose: Spring Boot + Postgres)
2. Build the actual Zoho Cliq Message Action + `/decide` slash command (Deluge scripts), pointed at the deployed backend
3. Add `@VELQIVO search` bot mention handler in Cliq
4. (Later) LLM-based auto-detection of decision-worthy messages
