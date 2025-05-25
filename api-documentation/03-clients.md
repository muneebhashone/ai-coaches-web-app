# Clients API

**Base URL:** `http://localhost:PORT/api/clients`

## Routes

### GET /

Get paginated list of clients

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in name, email, phone)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - filterByKakao: boolean (optional, filter clients with KakaoTalk integration)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Clients retrieved successfully",
  "data": {
    "clients": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Emma Thompson",
        "kakaoId": "kakao_user_12345",
        "metadata": {
          "email": "emma.thompson@example.com",
          "phone": "+1-555-0123"
        },
        "activeProgramId": "6743a2f123d45e001234567b",
        "user": "6743a2f123d45e001234567c",
        "active": true,
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
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

Create new client

- **Method:** POST
- **Authentication:** Required (SUPER_ADMIN or COACH role)
- **Body:**
  - name: string (required)
  - kakaoId: string (optional)
  - metadata: object (optional)
    - email: string (optional, valid email)
    - phone: string (optional)
  - activeProgramId: string (optional)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Client created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Emma Thompson",
    "kakaoId": "kakao_user_12345",
    "metadata": {
      "email": "emma.thompson@example.com",
      "phone": "+1-555-0123"
    },
    "activeProgramId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "active": true,
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
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

- **403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### GET /:id

Get client by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Client retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Emma Thompson",
    "kakaoId": "kakao_user_12345",
    "metadata": {
      "email": "emma.thompson@example.com",
      "phone": "+1-555-0123"
    },
    "activeProgramId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "active": true,
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Client not found"
}
```

### PUT /:id

Update client information

- **Method:** PUT
- **Authentication:** Required (SUPER_ADMIN or COACH role)
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - kakaoId: string (optional)
  - metadata: object (optional)
    - email: string (optional, valid email)
    - phone: string (optional)
  - activeProgramId: string (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Client updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Emma Thompson",
    "kakaoId": "kakao_user_12345",
    "metadata": {
      "email": "emma.thompson@example.com",
      "phone": "+1-555-0123"
    },
    "activeProgramId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "active": true,
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T09:15:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Client not found"
}
```

- **403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### DELETE /:id

Delete client

- **Method:** DELETE
- **Authentication:** Required (SUPER_ADMIN role)
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Client deleted successfully"
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Client not found"
}
```

- **403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

## Data Schemas

### Client Object
```json
{
  "_id": "string",
  "name": "string",
  "kakaoId": "string | null",
  "metadata": {
    "email": "string | null",
    "phone": "string | null"
  },
  "activeProgramId": "string | null",
  "user": "string",
  "active": "boolean",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```
