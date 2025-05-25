# Sessions API

**Base URL:** `http://localhost:PORT/api/sessions`

## Routes

### GET /

Get paginated list of sessions for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in name)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - status: enum (optional, "active" | "completed" | "cancelled" | "next")
  - active: string (optional, "true" for active sessions only)
  - chatbotId: string (optional)
  - programId: string (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Sessions retrieved successfully",
  "data": {
    "sessions": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Week 1 - Goal Setting Session",
        "programId": "6743a2f123d45e001234567b",
        "chatbotId": "6743a2f123d45e001234567c",
        "duration": "1hr",
        "sessionDate": "2024-01-20T14:00:00.000Z",
        "status": "next",
        "active": true,
        "user": "6743a2f123d45e001234567d",
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:30:00.000Z"
      },
      {
        "_id": "6743a2f123d45e001234567e",
        "name": "Week 2 - Progress Review",
        "programId": "6743a2f123d45e001234567b",
        "chatbotId": "6743a2f123d45e001234567c",
        "duration": "45m",
        "sessionDate": "2024-01-13T10:00:00.000Z",
        "status": "completed",
        "active": true,
        "user": "6743a2f123d45e001234567d",
        "createdAt": "2024-01-10T08:30:00.000Z",
        "updatedAt": "2024-01-13T11:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 4,
      "totalItems": 38,
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

### POST /

Create new session

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - name: string (required)
  - programId: string (required)
  - chatbotId: string (required)
  - duration: string (required, e.g., "15m", "30m", "1hr", "1hr30m", "2hr")
  - sessionDate: string (required, ISO datetime)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Session created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Week 1 - Goal Setting Session",
    "programId": "6743a2f123d45e001234567b",
    "chatbotId": "6743a2f123d45e001234567c",
    "duration": "1hr",
    "sessionDate": "2024-01-20T14:00:00.000Z",
    "status": "next",
    "active": true,
    "user": "6743a2f123d45e001234567d",
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
      "field": "sessionDate",
      "message": "Session date must be in the future"
    }
  ]
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Program or chatbot not found"
}
```

### GET /:id

Get session by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Session retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Week 1 - Goal Setting Session",
    "programId": "6743a2f123d45e001234567b",
    "chatbotId": "6743a2f123d45e001234567c",
    "duration": "1hr",
    "sessionDate": "2024-01-20T14:00:00.000Z",
    "status": "next",
    "active": true,
    "user": "6743a2f123d45e001234567d",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Session not found"
}
```

### PUT /:id

Update session information

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - status: enum (optional, "active" | "completed" | "cancelled" | "next")
  - duration: string (optional)
  - sessionDate: string (optional, ISO datetime)
  - active: boolean (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Session updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Week 1 - Updated Goal Setting Session",
    "programId": "6743a2f123d45e001234567b",
    "chatbotId": "6743a2f123d45e001234567c",
    "duration": "1hr30m",
    "sessionDate": "2024-01-20T15:00:00.000Z",
    "status": "active",
    "active": true,
    "user": "6743a2f123d45e001234567d",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T09:15:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Session not found"
}
```

- **400 Bad Request:**
```json
{
  "success": false,
  "message": "Cannot modify completed session"
}
```

### DELETE /:id

Delete session

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Session not found"
}
```

- **400 Bad Request:**
```json
{
  "success": false,
  "message": "Cannot delete active session"
}
```

## Data Schemas

### Session Object
```json
{
  "_id": "string",
  "name": "string",
  "programId": "string",
  "chatbotId": "string",
  "duration": "string (e.g., '15m', '30m', '1hr', '1hr30m', '2hr')",
  "sessionDate": "string (ISO datetime)",
  "status": "active | completed | cancelled | next",
  "active": "boolean",
  "user": "string",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```
