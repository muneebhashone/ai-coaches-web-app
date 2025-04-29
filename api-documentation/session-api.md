# Session API Documentation

API endpoints for managing AI chat sessions between chatbots and clients.

## Base Path

```
/sessions
```

## Endpoints

### Create Session

Creates a new chat session.

**Endpoint:** `POST /sessions`

**Authentication:** Required

**Request Body:**
```typescript
{
  chatbotId: string;
  clientId: string;
  title?: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    chatbotId: string;
    clientId: string;
    title?: string;
    startTime: string;
    status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
    messages: Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>;
    metadata?: Record<string, any>;
    feedback?: {
      rating?: number;
      comment?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `201 Created`: Session successfully created
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Chatbot or client not found
- `500 Internal Server Error`: Server error

---

### Update Session

Updates an existing session.

**Endpoint:** `PUT /sessions/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Session ID (MongoDB ObjectId)

**Request Body:**
```typescript
{
  title?: string;
  status?: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
  endTime?: string;
  feedback?: {
    rating?: number;
    comment?: string;
  };
  metadata?: Record<string, any>;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    chatbotId: string;
    clientId: string;
    title?: string;
    startTime: string;
    endTime?: string;
    status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
    messages: Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>;
    metadata?: Record<string, any>;
    feedback?: {
      rating?: number;
      comment?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Session successfully updated
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Session not found
- `500 Internal Server Error`: Server error

---

### Get Session

Retrieves a specific session by ID.

**Endpoint:** `GET /sessions/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Session ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  data: {
    id: string;
    chatbotId: {
      id: string;
      name: string;
      // Other chatbot fields
    };
    clientId: {
      id: string;
      name: string;
      // Other client fields
    };
    title?: string;
    startTime: string;
    endTime?: string;
    status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
    messages: Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>;
    metadata?: Record<string, any>;
    feedback?: {
      rating?: number;
      comment?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Session not found
- `500 Internal Server Error`: Server error

---

### End Session

Ends an active session by changing status to COMPLETED and setting endTime.

**Endpoint:** `POST /sessions/:id/end`

**Authentication:** Required

**Path Parameters:**
- `id`: Session ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    chatbotId: string;
    clientId: string;
    title?: string;
    startTime: string;
    endTime: string;
    status: "COMPLETED";
    messages: Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>;
    metadata?: Record<string, any>;
    feedback?: {
      rating?: number;
      comment?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Session successfully ended
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Active session not found
- `500 Internal Server Error`: Server error

---

### Add Message

Adds a message to a session.

**Endpoint:** `POST /sessions/message`

**Authentication:** Required

**Query Parameters:**
- `sessionId`: Session ID (MongoDB ObjectId)

**Request Body:**
```typescript
{
  message: {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: string;
  }
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    id: string;
    chatbotId: string;
    clientId: string;
    title?: string;
    startTime: string;
    endTime?: string;
    status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
    messages: Array<{
      role: "user" | "assistant" | "system";
      content: string;
      timestamp: string;
    }>;
    metadata?: Record<string, any>;
    feedback?: {
      rating?: number;
      comment?: string;
    };
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Message successfully added
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Session not found or not active
- `500 Internal Server Error`: Server error

---

### Process Message with AI

Sends a user message to the chatbot and receives an AI-generated response.

**Endpoint:** `POST /sessions/chat`

**Authentication:** Required

**Query Parameters:**
- `sessionId`: Session ID (MongoDB ObjectId)

**Request Body:**
```typescript
{
  content: string;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    role: "assistant";
    content: string;
    timestamp: string;
  }
}
```

**Status Codes:**
- `200 OK`: Message successfully processed
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Session, chatbot, or client not found
- `500 Internal Server Error`: Server error

---

### List Sessions

Retrieves a paginated list of sessions.

**Endpoint:** `GET /sessions`

**Authentication:** Required

**Query Parameters:**
- `searchString` (optional): Search term for session title
- `status` (optional): Filter by status ("ACTIVE", "COMPLETED", "TERMINATED", "SCHEDULED")
- `chatbotId` (optional): Filter by chatbot ID
- `clientId` (optional): Filter by client ID
- `startDate` (optional): Filter sessions created on or after this date (ISO format)
- `endDate` (optional): Filter sessions created on or before this date (ISO format)
- `limit` (optional): Number of results per page (default: 10)
- `skip` (optional): Number of records to skip (default: 0)

**Response:**
```typescript
{
  success: boolean;
  data: {
    results: Array<{
      id: string;
      chatbotId: {
        id: string;
        name: string;
        // Other chatbot fields
      };
      clientId: {
        id: string;
        name: string;
        // Other client fields
      };
      title?: string;
      startTime: string;
      endTime?: string;
      status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";
      messages: Array<{
        role: "user" | "assistant" | "system";
        content: string;
        timestamp: string;
      }>;
      metadata?: Record<string, any>;
      feedback?: {
        rating?: number;
        comment?: string;
      };
      createdAt: string;
      updatedAt: string;
    }>;
    paginatorInfo: {
      count: number;
      currentPage: number;
      hasMorePages: boolean;
      lastPage: number;
      limit: number;
      perPage: number;
      total: number;
    }
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid query parameters
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error