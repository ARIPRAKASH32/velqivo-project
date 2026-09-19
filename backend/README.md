# VELQIVO Backend

Spring Boot API that stores decision records captured from Zoho Cliq.

## 1. Run Postgres locally (Docker)

```bash
docker run --name velqivo-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=velqivo \
  -p 5432:5432 \
  -d postgres:16
```

## 2. Run the backend

```bash
mvn spring-boot:run
```

API will be live at `http://localhost:8080`

## 3. Test endpoints (before touching Cliq)

Create a decision:
```bash
curl -X POST http://localhost:8080/api/decisions \
  -H "Content-Type: application/json" \
  -d '{
    "decisionText": "Use Razorpay",
    "reason": "API compatibility",
    "approvedBy": "Project Manager",
    "owner": "Arun",
    "relatedTask": "Payment Integration",
    "status": "IN_PROGRESS",
    "sourceChannel": "engineering",
    "sourceMessageLink": "https://cliq.zoho.com/..."
  }'
```

Get all:
```bash
curl http://localhost:8080/api/decisions
```

Search:
```bash
curl "http://localhost:8080/api/decisions/search?q=razorpay"
```

## 4. Expose locally to Zoho Cliq (before AWS deployment)

Cliq's Deluge `invokeurl` needs a public URL. Use ngrok while developing:

```bash
ngrok http 8080
```

Copy the `https://xxxx.ngrok-free.app` URL and use it as the base URL
in your Cliq Message Action / Slash Command Deluge scripts instead of
localhost.

## 5. Deploy to AWS EC2 (replaces ngrok URL)

1. Launch a t2.micro EC2 instance (Ubuntu 22.04, free tier)
2. Install Docker + Docker Compose on the instance
3. Build the JAR locally: `mvn clean package`
4. Copy JAR to EC2: `scp target/velqivo-backend-0.0.1-SNAPSHOT.jar ubuntu@<EC2_IP>:~`
5. Run Postgres + the JAR as containers (docker-compose) on the instance
6. Update your Cliq Deluge scripts' `invokeurl` to point at
   `http://<EC2_PUBLIC_IP>:8080/api/decisions`

## API Reference

| Method | Endpoint                          | Used by                                  |
|--------|------------------------------------|-------------------------------------------|
| POST   | /api/decisions                     | Cliq Message Action, Cliq /decide, React create form |
| GET    | /api/decisions                     | React dashboard list view                |
| GET    | /api/decisions/{id}                | React detail view                        |
| GET    | /api/decisions/search?q=           | Cliq @VELQIVO search, React search bar   |
| GET    | /api/decisions/status/{status}     | React filter                             |
| GET    | /api/decisions/owner/{owner}       | React filter                             |
| PATCH  | /api/decisions/{id}/status         | React status update                      |
| DELETE | /api/decisions/{id}                | React delete                             |
