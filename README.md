# VELQIVO — Full Project (Backend + Frontend)

Decision-tracking system for Zoho Cliq. This folder contains both halves:

```
velqivo-project/
 ├── backend/    Spring Boot REST API + Postgres (Java)
 └── frontend/   React dashboard (Vite + Tailwind v4)
```

Both are verified working:
- **Backend**: already tested end-to-end by you — Postgres via Docker, `mvn spring-boot:run`, confirmed POST/GET via curl.
- **Frontend**: freshly scaffolded, dependencies installed, and `npm run build` completes with zero errors.

## Run order (always this sequence)

### 1. Start Postgres (Docker)
```bash
docker start velqivo-db
```
(If the container doesn't exist yet, use the original `docker run` command from earlier — but you already created it, so `docker start` reuses it.)

### 2. Start the backend — Terminal 1
```bash
cd velqivo-project/backend
mvn spring-boot:run
```
Leave this running. Confirm: `curl http://localhost:8080/api/decisions`

### 3. Start the frontend — Terminal 2
```bash
cd velqivo-project/frontend
npm install
npm run dev
```
Open the printed URL (usually `http://localhost:5173`).

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
