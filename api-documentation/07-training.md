# Training API

**Base URL:** `http://localhost:PORT/api/training`

## Routes

### POST /run

Start training process for a chatbot

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - chatbotId: string (required)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Training job started successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "chatbotId": "6743a2f123d45e001234567b",
    "status": "pending",
    "progress": 0,
    "logs": [],
    "startTime": "2024-01-15T08:30:00.000Z",
    "endTime": null,
    "duration": null,
    "user": "6743a2f123d45e001234567c",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  }
}
```

- **400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "chatbotId",
      "message": "Invalid chatbot ID"
    }
  ]
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Chatbot not found"
}
```

- **409 Conflict:**
```json
{
  "success": false,
  "message": "Training already in progress for this chatbot"
}
```

### GET /

Get paginated list of training jobs for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - status: enum (optional, "pending" | "completed" | "failed")

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Training jobs retrieved successfully",
  "data": {
    "trainings": [
      {
        "_id": "6743a2f123d45e001234567a",
        "chatbotId": "6743a2f123d45e001234567b",
        "status": "completed",
        "progress": 100,
        "logs": [
          {
            "timestamp": "2024-01-15T08:30:15.000Z",
            "level": "info",
            "message": "Starting training process"
          },
          {
            "timestamp": "2024-01-15T08:35:22.000Z",
            "level": "info",
            "message": "Processing knowledge base documents"
          },
          {
            "timestamp": "2024-01-15T08:42:18.000Z",
            "level": "success",
            "message": "Training completed successfully"
          }
        ],
        "startTime": "2024-01-15T08:30:00.000Z",
        "endTime": "2024-01-15T08:42:18.000Z",
        "duration": 738000,
        "user": "6743a2f123d45e001234567c",
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:42:18.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

- **401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### GET /:id

Get training job by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Training job retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "chatbotId": "6743a2f123d45e001234567b",
    "status": "completed",
    "progress": 100,
    "logs": [
      {
        "timestamp": "2024-01-15T08:30:15.000Z",
        "level": "info",
        "message": "Starting training process"
      },
      {
        "timestamp": "2024-01-15T08:35:22.000Z",
        "level": "info",
        "message": "Processing knowledge base documents"
      },
      {
        "timestamp": "2024-01-15T08:42:18.000Z",
        "level": "success",
        "message": "Training completed successfully"
      }
    ],
    "startTime": "2024-01-15T08:30:00.000Z",
    "endTime": "2024-01-15T08:42:18.000Z",
    "duration": 738000,
    "user": "6743a2f123d45e001234567c",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:42:18.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Training job not found"
}
```

## Data Schemas

### Training Job Object
```json
{
  "_id": "string",
  "chatbotId": "string",
  "status": "pending | running | completed | failed",
  "progress": "number (0-100)",
  "logs": [
    {
      "timestamp": "string (ISO datetime)",
      "level": "info | warning | error | success",
      "message": "string"
    }
  ],
  "startTime": "string (ISO datetime)",
  "endTime": "string (ISO datetime) | null",
  "duration": "number (milliseconds) | null",
  "user": "string",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Training Log Entry
```json
{
  "timestamp": "string (ISO datetime)",
  "level": "info | warning | error | success",
  "message": "string"
}
```
