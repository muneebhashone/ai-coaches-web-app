# Client API Documentation

API endpoints for managing client profiles.

## Base Path

```
/clients
```

## Endpoints

### Create Client

Creates a new client.

**Endpoint:** `POST /clients`

**Authentication:** Required

**Request Body:**
```typescript
{
  name: string;
  email: string;
  phoneNumber?: string;
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
    email: string;
    phoneNumber?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `201 Created`: Client successfully created
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error

---

### Update Client

Updates an existing client.

**Endpoint:** `PUT /clients/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Client ID (MongoDB ObjectId)

**Request Body:**
```typescript
{
  name?: string;
  email?: string;
  phoneNumber?: string;
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
    email: string;
    phoneNumber?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Client successfully updated
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Client not found
- `500 Internal Server Error`: Server error

---

### Get Client

Retrieves a specific client by ID.

**Endpoint:** `GET /clients/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Client ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Client not found
- `500 Internal Server Error`: Server error

---

### Delete Client

Deletes a specific client.

**Endpoint:** `DELETE /clients/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Client ID (MongoDB ObjectId)

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Status Codes:**
- `200 OK`: Client successfully deleted
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Client not found
- `500 Internal Server Error`: Server error

---

### List Clients

Retrieves a paginated list of clients.

**Endpoint:** `GET /clients`

**Authentication:** Required

**Query Parameters:**
- `searchString` (optional): Search term for client name or email
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
      email: string;
      phoneNumber?: string;
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