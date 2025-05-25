# Knowledge Bases API

**Base URL:** `http://localhost:PORT/api/knowledge-bases`

## Routes

### GET /

Get paginated list of knowledge bases for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in name, description)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - active: string (optional, "true" for active knowledge bases only)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Knowledge bases retrieved successfully",
  "data": {
    "knowledgeBases": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Leadership Best Practices",
        "description": "Comprehensive collection of leadership methodologies, case studies, and best practices from industry experts",
        "chatbotId": "6743a2f123d45e001234567b",
        "documentCount": 25,
        "totalSize": 15728640,
        "lastUpdated": "2024-01-15T08:30:00.000Z",
        "active": true,
        "user": "6743a2f123d45e001234567c",
        "createdAt": "2024-01-10T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:30:00.000Z"
      },
      {
        "_id": "6743a2f123d45e001234567d",
        "name": "Communication Frameworks",
        "description": "Research papers, frameworks, and guides for effective business communication",
        "chatbotId": "6743a2f123d45e001234567b",
        "documentCount": 18,
        "totalSize": 8912384,
        "lastUpdated": "2024-01-12T14:20:00.000Z",
        "active": true,
        "user": "6743a2f123d45e001234567c",
        "createdAt": "2024-01-08T08:30:00.000Z",
        "updatedAt": "2024-01-12T14:20:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
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

Create new knowledge base

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - name: string (required)
  - description: string (optional)
  - chatbotId: string (required)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Knowledge base created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Leadership Best Practices",
    "description": "Comprehensive collection of leadership methodologies, case studies, and best practices from industry experts",
    "chatbotId": "6743a2f123d45e001234567b",
    "documentCount": 0,
    "totalSize": 0,
    "lastUpdated": null,
    "active": true,
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
      "field": "name",
      "message": "Knowledge base name is required"
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

### GET /:id

Get knowledge base by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Knowledge base retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Leadership Best Practices",
    "description": "Comprehensive collection of leadership methodologies, case studies, and best practices from industry experts",
    "chatbotId": "6743a2f123d45e001234567b",
    "documentCount": 25,
    "totalSize": 15728640,
    "lastUpdated": "2024-01-15T08:30:00.000Z",
    "active": true,
    "user": "6743a2f123d45e001234567c",
    "documents": [
      {
        "_id": "6743a2f123d45e001234567e",
        "name": "Transformational Leadership Guide.pdf",
        "fileType": "pdf",
        "size": 2048576,
        "uploadedAt": "2024-01-15T08:30:00.000Z"
      }
    ],
    "createdAt": "2024-01-10T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Knowledge base not found"
}
```

### PUT /:id

Update knowledge base information

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - description: string (optional)
  - active: boolean (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Knowledge base updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Advanced Leadership Best Practices",
    "description": "Comprehensive collection of advanced leadership methodologies, case studies, and best practices from industry experts",
    "chatbotId": "6743a2f123d45e001234567b",
    "documentCount": 25,
    "totalSize": 15728640,
    "lastUpdated": "2024-01-15T08:30:00.000Z",
    "active": true,
    "user": "6743a2f123d45e001234567c",
    "createdAt": "2024-01-10T08:30:00.000Z",
    "updatedAt": "2024-01-15T09:15:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Knowledge base not found"
}
```

### DELETE /:id

Delete knowledge base and all related documents

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Knowledge base and all related documents deleted successfully",
  "data": {
    "deletedDocuments": 25,
    "freedSpace": 15728640
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Knowledge base not found"
}
```

- **409 Conflict:**
```json
{
  "success": false,
  "message": "Cannot delete knowledge base - chatbot is currently being trained"
}
```

## Data Schemas

### Knowledge Base Object
```json
{
  "_id": "string",
  "name": "string",
  "description": "string | null",
  "chatbotId": "string",
  "documentCount": "number",
  "totalSize": "number (bytes)",
  "lastUpdated": "string (ISO datetime) | null",
  "active": "boolean",
  "user": "string",
  "documents": [
    {
      "_id": "string",
      "name": "string",
      "fileType": "pdf | csv | docx | xlsx | txt",
      "size": "number (bytes)",
      "uploadedAt": "string (ISO datetime)"
    }
  ],
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Knowledge Base Summary
```json
{
  "_id": "string",
  "name": "string",
  "description": "string | null",
  "chatbotId": "string",
  "documentCount": "number",
  "totalSize": "number (bytes)",
  "lastUpdated": "string (ISO datetime) | null",
  "active": "boolean",
  "user": "string",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```
