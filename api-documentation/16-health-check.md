# Health Check API

**Base URL:** `http://localhost:PORT/api/healthcheck`

## Routes

### GET /

Check system health status

- **Method:** GET
- **Authentication:** Not required

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "System is healthy",
    "data": {
      "status": "OK",
      "timestamp": "2023-12-01T10:00:00.000Z",
      "uptime": "72h 30m 15s",
      "services": {
        "database": "connected",
        "redis": "connected",
        "s3": "connected",
        "openai": "connected",
        "pinecone": "connected"
      },
      "version": "1.0.0",
      "environment": "production"
    }
  }
  ```
- **Error (503):**
  ```json
  {
    "success": false,
    "message": "Service unavailable",
    "data": {
      "status": "DEGRADED",
      "timestamp": "2023-12-01T10:00:00.000Z",
      "services": {
        "database": "disconnected",
        "redis": "connected",
        "s3": "connected",
        "openai": "timeout",
        "pinecone": "connected"
      }
    }
  }
  ```

## Health Status Schema

```json
{
  "status": "OK | DEGRADED | DOWN",
  "timestamp": "string (ISO date)",
  "uptime": "string (human readable duration)",
  "services": {
    "database": "connected | disconnected | timeout",
    "redis": "connected | disconnected | timeout",
    "s3": "connected | disconnected | timeout",
    "openai": "connected | disconnected | timeout",
    "pinecone": "connected | disconnected | timeout"
  },
  "version": "string (app version)",
  "environment": "development | production"
}
```

## Service Status Codes

- **200 OK:** All services are operational
- **503 Service Unavailable:** One or more critical services are down
