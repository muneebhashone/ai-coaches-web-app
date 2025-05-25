# Chats API

**Base URL:** `http://localhost:PORT/api/chats`

## Routes

### POST /start

Start new chat session (unprotected - client access)

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - sessionId: string (required)
  - clientId: string (required)

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "sessionId": "64a1b2c3d4e5f6789abcdef1",
    "clientId": "64a1b2c3d4e5f6789abcdef2",
    "chatbotId": "64a1b2c3d4e5f6789abcdef3",
    "active": true,
    "messages": [],
    "messageCount": 0,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "sessionId and clientId are required"
}
```
- **409 Conflict**
```json
{
  "success": false,
  "message": "Chat session already exists for this session"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to create chat session"
}
```

### POST /:id/messages

Send message in chat (unprotected - client access)

- **Method:** POST
- **Authentication:** Not required
- **Params:**
  - id: string (required, chat ID)
- **Body:**
  - content: string (required, max 4000 chars)
  - role: enum (optional, default: "client", values: "client" | "coach")

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "message": {
      "_id": "64a1b2c3d4e5f6789abcdef4",
      "content": "Hello, I'm looking for guidance on setting career goals.",
      "role": "client",
      "timestamp": "2024-01-15T10:35:00.000Z"
    },
    "aiResponse": {
      "_id": "64a1b2c3d4e5f6789abcdef5",
      "content": "Hello! I'm excited to help you with your career goals. Setting clear, achievable career objectives is a crucial step in professional development. What specific area of your career would you like to focus on first?",
      "role": "coach",
      "timestamp": "2024-01-15T10:35:02.000Z"
    }
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "content is required and must be under 4000 characters"
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to send message"
}
```

### GET /:id/messages

Get chat messages with pagination (unprotected - client access)

- **Method:** GET
- **Authentication:** Not required
- **Params:**
  - id: string (required, chat ID)
- **Query:**
  - limitParam: string (optional, default: "50", positive integer)
  - pageParam: string (optional, default: "1", positive integer)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef4",
        "content": "Hello, I'm looking for guidance on setting career goals.",
        "role": "client",
        "timestamp": "2024-01-15T10:35:00.000Z"
      },
      {
        "_id": "64a1b2c3d4e5f6789abcdef5",
        "content": "Hello! I'm excited to help you with your career goals. Setting clear, achievable career objectives is a crucial step in professional development.",
        "role": "coach",
        "timestamp": "2024-01-15T10:35:02.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 2,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid query parameters"
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found"
}
```

### GET /session/:sessionId

Get chat by session ID (unprotected - client access)

- **Method:** GET
- **Authentication:** Not required
- **Params:**
  - sessionId: string (required)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "sessionId": "64a1b2c3d4e5f6789abcdef1",
    "clientId": "64a1b2c3d4e5f6789abcdef2",
    "chatbotId": "64a1b2c3d4e5f6789abcdef3",
    "active": true,
    "messageCount": 8,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found for this session"
}
```

### GET /

Get paginated list of chats (protected - coach access)

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - sessionId: string (optional)
  - clientId: string (optional)
  - chatbotId: string (optional)
  - active: string (optional, "true" | "false")
  - searchString: string (optional)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "sessionId": "64a1b2c3d4e5f6789abcdef1",
        "clientId": "64a1b2c3d4e5f6789abcdef2",
        "chatbotId": "64a1b2c3d4e5f6789abcdef3",
        "active": true,
        "messageCount": 12,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T11:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 28,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid query parameters"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### GET /:id

Get chat by ID (protected - coach access)

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "sessionId": "64a1b2c3d4e5f6789abcdef1",
    "clientId": "64a1b2c3d4e5f6789abcdef2",
    "chatbotId": "64a1b2c3d4e5f6789abcdef3",
    "active": true,
    "messages": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef4",
        "content": "Hello, I'm looking for guidance on setting career goals.",
        "role": "client",
        "timestamp": "2024-01-15T10:35:00.000Z"
      }
    ],
    "messageCount": 8,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:15:00.000Z"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid ID format"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found"
}
```

### POST /:id/coach-message

Send message as coach (protected - coach access)

- **Method:** POST
- **Authentication:** Required (COACH or SUPER_ADMIN role)
- **Params:**
  - id: string (required, chat ID)
- **Body:**
  - content: string (required, max 4000 chars)
  - role: enum (optional, default: "client", values: "client" | "coach")

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef6",
    "content": "That's a great question about career planning. Let's break down your goals into specific, measurable objectives.",
    "role": "coach",
    "timestamp": "2024-01-15T10:40:00.000Z"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "content is required and must be under 4000 characters"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **403 Forbidden**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found"
}
```

### PUT /:id/status

Update chat status (protected - coach access)

- **Method:** PUT
- **Authentication:** Required (COACH or SUPER_ADMIN role)
- **Params:**
  - id: string (required, chat ID)
- **Body:**
  - active: boolean (required)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "active": false,
    "updatedAt": "2024-01-15T11:20:00.000Z"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "active field is required"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **403 Forbidden**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```
- **404 Not Found**
```json
{
  "success": false,
  "message": "Chat not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to update chat status"
}
```

## Data Schemas

### Chat Object
```json
{
  "_id": "string (MongoDB ObjectId)",
  "sessionId": "string (MongoDB ObjectId)",
  "clientId": "string (MongoDB ObjectId)",
  "chatbotId": "string (MongoDB ObjectId)",
  "active": "boolean",
  "messages": "array of Message objects",
  "messageCount": "number",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Message Object
```json
{
  "_id": "string (MongoDB ObjectId)",
  "content": "string",
  "role": "enum (client | coach)",
  "timestamp": "string (ISO datetime)"
}
```
