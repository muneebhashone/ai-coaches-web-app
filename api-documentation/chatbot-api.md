# Chatbot API Documentation

API endpoints for managing AI-powered chatbots.

## Base Path

```
/chatbots
```

## Endpoints

### Create Chatbot

Creates a new chatbot.

**Endpoint:** `POST /chatbots`

**Authentication:** Required

**Request Body:**
```typescript
{
  name: string;
  description?: string;
  persona?: {
    name: string;
    description: string;
    promptTemplate: string;
    systemInstructions?: string;
  };
  apiSettings?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
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
    name: string;
    description?: string;
    persona: {
      name: string;
      description: string;
      promptTemplate: string;
      systemInstructions: string;
    };
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    apiSettings: {
      model: string;
      temperature: number;
      maxTokens: number;
    };
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `201 Created`: Chatbot successfully created
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error

---

### Update Chatbot

Updates an existing chatbot.

**Endpoint:** `PUT /chatbots/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Chatbot ID (MongoDB ObjectId)

**Request Body:**
```typescript
{
  name?: string;
  description?: string;
  persona?: {
    name?: string;
    description?: string;
    promptTemplate?: string;
    systemInstructions?: string;
  };
  status?: "ACTIVE" | "INACTIVE";
  apiSettings?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
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
    name: string;
    description?: string;
    persona: {
      name: string;
      description: string;
      promptTemplate: string;
      systemInstructions: string;
    };
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    apiSettings: {
      model: string;
      temperature: number;
      maxTokens: number;
    };
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Chatbot successfully updated
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Chatbot not found
- `500 Internal Server Error`: Server error

---

### Get Chatbot

Retrieves a specific chatbot by ID.

**Endpoint:** `GET /chatbots/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Chatbot ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  data: {
    id: string;
    name: string;
    description?: string;
    persona: {
      name: string;
      description: string;
      promptTemplate: string;
      systemInstructions: string;
    };
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    apiSettings: {
      model: string;
      temperature: number;
      maxTokens: number;
    };
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Chatbot not found
- `500 Internal Server Error`: Server error

---

### Delete Chatbot

Soft deletes a chatbot by setting its status to DELETED.

**Endpoint:** `DELETE /chatbots/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Chatbot ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Status Codes:**
- `200 OK`: Chatbot successfully deleted
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Chatbot not found
- `500 Internal Server Error`: Server error

---

### List Chatbots

Retrieves a paginated list of chatbots.

**Endpoint:** `GET /chatbots`

**Authentication:** Required

**Query Parameters:**
- `searchString` (optional): Search term for chatbot name or description
- `status` (optional): Filter by status ("ACTIVE", "INACTIVE")
- `limit` (optional): Number of results per page (default: 10)
- `skip` (optional): Number of records to skip (default: 0)

**Response:**
```typescript
{
  success: boolean;
  data: {
    results: Array<{
      id: string;
      name: string;
      description?: string;
      persona: {
        name: string;
        description: string;
        promptTemplate: string;
        systemInstructions: string;
      };
      status: "ACTIVE" | "INACTIVE" | "DELETED";
      apiSettings: {
        model: string;
        temperature: number;
        maxTokens: number;
      };
      metadata?: Record<string, any>;
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

---

### Get Default Persona Templates

Retrieves default persona templates for creating new chatbots.

**Endpoint:** `GET /chatbots/defaults/persona`

**Authentication:** Required

**Query Parameters:**
- `name` (optional): Coach name to use in default persona
- `expertise` (optional): Coach expertise to use in default persona

**Response:**
```typescript
{
  success: boolean;
  data: {
    defaultPersona: {
      name: string;
      description: string;
      promptTemplate: string;
      systemInstructions: string;
    };
    systemInstructions: string;
    promptTemplate: string;
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error