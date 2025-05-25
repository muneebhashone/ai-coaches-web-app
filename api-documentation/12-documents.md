# Documents API

**Base URL:** `http://localhost:PORT/api/knowledge-bases/:knowledgeBaseId/documents`

## Routes

### GET /

Get paginated list of documents in knowledge base

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - knowledgeBaseId: string (required, valid MongoDB ID)
- **Query:**
  - searchString: string (optional, search in name, description)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - fileType: enum (optional, "pdf" | "csv" | "docx" | "xlsx" | "txt")

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "documents": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Transformational Leadership Guide",
        "description": "Comprehensive guide on transformational leadership principles and practices",
        "fileType": "pdf",
        "fileUrl": "https://s3.amazonaws.com/your-bucket/documents/leadership-guide.pdf",
        "fileSize": 2048576,
        "processingStatus": "completed",
        "extractedText": "Leadership is the art of motivating a group of people...",
        "vectorCount": 156,
        "knowledgeBaseId": "6743a2f123d45e001234567b",
        "user": "6743a2f123d45e001234567c",
        "uploadedAt": "2024-01-15T08:30:00.000Z",
        "processedAt": "2024-01-15T08:32:15.000Z",
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:32:15.000Z"
      },
      {
        "_id": "6743a2f123d45e001234567d",
        "name": "Communication Best Practices",
        "description": "Research-based communication strategies for business leaders",
        "fileType": "docx",
        "fileUrl": "https://s3.amazonaws.com/your-bucket/documents/communication-practices.docx",
        "fileSize": 1536000,
        "processingStatus": "processing",
        "extractedText": null,
        "vectorCount": 0,
        "knowledgeBaseId": "6743a2f123d45e001234567b",
        "user": "6743a2f123d45e001234567c",
        "uploadedAt": "2024-01-15T09:00:00.000Z",
        "processedAt": null,
        "createdAt": "2024-01-15T09:00:00.000Z",
        "updatedAt": "2024-01-15T09:00:00.000Z"
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

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Knowledge base not found"
}
```

### POST /

Create new document in knowledge base

- **Method:** POST
- **Authentication:** Required
- **Params:**
  - knowledgeBaseId: string (required, valid MongoDB ID)
- **Body:**
  - name: string (required)
  - description: string (optional)
  - fileType: enum (required, "pdf" | "csv" | "docx" | "xlsx" | "txt")
  - fileUrl: string (required, valid URL)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Document created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Transformational Leadership Guide",
    "description": "Comprehensive guide on transformational leadership principles and practices",
    "fileType": "pdf",
    "fileUrl": "https://s3.amazonaws.com/your-bucket/documents/leadership-guide.pdf",
    "fileSize": 2048576,
    "processingStatus": "pending",
    "extractedText": null,
    "vectorCount": 0,
    "knowledgeBaseId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "uploadedAt": "2024-01-15T08:30:00.000Z",
    "processedAt": null,
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
      "field": "fileUrl",
      "message": "Invalid file URL"
    }
  ]
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Knowledge base not found"
}
```

- **413 Payload Too Large:**
```json
{
  "success": false,
  "message": "File size exceeds maximum limit of 50MB"
}
```

### GET /:id

Get document by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - knowledgeBaseId: string (required, valid MongoDB ID)
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Transformational Leadership Guide",
    "description": "Comprehensive guide on transformational leadership principles and practices",
    "fileType": "pdf",
    "fileUrl": "https://s3.amazonaws.com/your-bucket/documents/leadership-guide.pdf",
    "fileSize": 2048576,
    "processingStatus": "completed",
    "extractedText": "Leadership is the art of motivating a group of people to act towards achieving a common goal...",
    "vectorCount": 156,
    "knowledgeBaseId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "uploadedAt": "2024-01-15T08:30:00.000Z",
    "processedAt": "2024-01-15T08:32:15.000Z",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:32:15.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Document not found"
}
```

### PUT /:id

Update document information

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - knowledgeBaseId: string (required, valid MongoDB ID)
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - description: string (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Document updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Advanced Transformational Leadership Guide",
    "description": "Enhanced comprehensive guide on transformational leadership principles and advanced practices",
    "fileType": "pdf",
    "fileUrl": "https://s3.amazonaws.com/your-bucket/documents/leadership-guide.pdf",
    "fileSize": 2048576,
    "processingStatus": "completed",
    "extractedText": "Leadership is the art of motivating a group of people...",
    "vectorCount": 156,
    "knowledgeBaseId": "6743a2f123d45e001234567b",
    "user": "6743a2f123d45e001234567c",
    "uploadedAt": "2024-01-15T08:30:00.000Z",
    "processedAt": "2024-01-15T08:32:15.000Z",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T09:15:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Document not found"
}
```

### DELETE /:id

Delete document from knowledge base

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - knowledgeBaseId: string (required, valid MongoDB ID)
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Document deleted successfully",
  "data": {
    "deletedVectors": 156,
    "freedSpace": 2048576
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Document not found"
}
```

- **409 Conflict:**
```json
{
  "success": false,
  "message": "Cannot delete document - knowledge base is currently being processed"
}
```

## Data Schemas

### Document Object
```json
{
  "_id": "string",
  "name": "string",
  "description": "string | null",
  "fileType": "pdf | csv | docx | xlsx | txt",
  "fileUrl": "string",
  "fileSize": "number (bytes)",
  "processingStatus": "pending | processing | completed | failed",
  "extractedText": "string | null",
  "vectorCount": "number",
  "knowledgeBaseId": "string",
  "user": "string",
  "uploadedAt": "string (ISO datetime)",
  "processedAt": "string (ISO datetime) | null",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Document Summary
```json
{
  "_id": "string",
  "name": "string",
  "fileType": "pdf | csv | docx | xlsx | txt",
  "fileSize": "number (bytes)",
  "processingStatus": "pending | processing | completed | failed",
  "vectorCount": "number",
  "uploadedAt": "string (ISO datetime)",
  "processedAt": "string (ISO datetime) | null"
}
```
