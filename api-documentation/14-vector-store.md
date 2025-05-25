# Vector Store API

**Base URL:** `http://localhost:PORT/api/vector-store`

## Routes

### POST /:namespace/search

Perform semantic search in vector store

- **Method:** POST
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)
- **Body:**
  - query: string (required, search query)
  - topK: number (optional, default: 5, min: 1, max: 100)
  - filter: object (optional, metadata filter)
  - includeValues: boolean (optional, default: false)
  - includeMetadata: boolean (optional, default: true)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "matches": [
      {
        "id": "doc_123_chunk_1",
        "score": 0.925,
        "values": [0.1, 0.2, 0.3],
        "metadata": {
          "text": "Career planning involves setting specific, measurable goals that align with your values and aspirations.",
          "source": "career_guide.pdf",
          "chunkIndex": 1,
          "documentId": "64a1b2c3d4e5f6789abcdef0"
        }
      },
      {
        "id": "doc_124_chunk_3",
        "score": 0.887,
        "values": [0.4, 0.5, 0.6],
        "metadata": {
          "text": "Effective goal setting requires breaking down large objectives into smaller, actionable steps.",
          "source": "coaching_manual.pdf",
          "chunkIndex": 3,
          "documentId": "64a1b2c3d4e5f6789abcdef1"
        }
      }
    ],
    "usage": {
      "readUnits": 6
    }
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "query is required"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Vector search failed"
}
```

### POST /:namespace/vectors

Insert vectors into namespace

- **Method:** POST
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)
- **Body:**
  - vectors: array (required, at least one vector)
    - id: string (required)
    - values: array of numbers (required)
    - metadata: object (optional)

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "upsertedCount": 3,
    "vectorIds": [
      "doc_123_chunk_1",
      "doc_123_chunk_2",
      "doc_123_chunk_3"
    ]
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "vectors array is required and must contain at least one vector"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to insert vectors"
}
```

### PUT /:namespace/vectors

Update existing vectors in namespace

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)
- **Body:**
  - updates: array (required, at least one update)
    - id: string (required)
    - values: array of numbers (optional)
    - metadata: object (optional)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "updatedCount": 2,
    "vectorIds": [
      "doc_123_chunk_1",
      "doc_123_chunk_2"
    ]
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "updates array is required and must contain at least one update"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to update vectors"
}
```

### DELETE /:namespace/vectors

Delete vectors by IDs

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)
- **Body:**
  - vectorIds: array of strings (required, at least one vector ID)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "deletedCount": 3,
    "vectorIds": [
      "doc_123_chunk_1",
      "doc_123_chunk_2",
      "doc_123_chunk_3"
    ]
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "vectorIds array is required and must contain at least one vector ID"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to delete vectors"
}
```

### DELETE /:namespace/vectors/filter

Delete vectors by metadata filter

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)
- **Body:**
  - filter: object (required, metadata filter)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "deletedCount": 15,
    "message": "Vectors matching filter deleted successfully"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "filter object is required"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to delete vectors by filter"
}
```

### GET /:namespace/stats

Get namespace statistics

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "dimension": 1536,
    "indexFullness": 0.0234,
    "namespaces": {
      "64a1b2c3d4e5f6789abcdef0": {
        "vectorCount": 1247
      }
    },
    "totalVectorCount": 1247
  }
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
  "message": "Namespace not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to get namespace statistics"
}
```

### DELETE /:namespace

Delete entire namespace

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - namespace: string (required, chatbot ID used as namespace)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "message": "Namespace deleted successfully",
    "namespace": "64a1b2c3d4e5f6789abcdef0"
  }
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
  "message": "Namespace not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to delete namespace"
}
```

### GET /namespaces

List all namespaces (admin only)

- **Method:** GET
- **Authentication:** Required (SUPER_ADMIN role)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "namespaces": [
      {
        "name": "64a1b2c3d4e5f6789abcdef0",
        "vectorCount": 1247,
        "dimension": 1536
      },
      {
        "name": "64a1b2c3d4e5f6789abcdef1",
        "vectorCount": 892,
        "dimension": 1536
      }
    ],
    "totalNamespaces": 2,
    "totalVectors": 2139
  }
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
  "message": "Insufficient permissions - SUPER_ADMIN role required"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to list namespaces"
}
```

## Data Schemas

### Vector Object
```json
{
  "id": "string",
  "values": "array of numbers (embeddings)",
  "metadata": {
    "text": "string",
    "source": "string",
    "chunkIndex": "number",
    "documentId": "string (MongoDB ObjectId)"
  }
}
```

### Search Match Object
```json
{
  "id": "string",
  "score": "number (0-1, similarity score)",
  "values": "array of numbers (optional)",
  "metadata": {
    "text": "string",
    "source": "string",
    "chunkIndex": "number",
    "documentId": "string (MongoDB ObjectId)"
  }
}
```

### Namespace Stats Object
```json
{
  "dimension": "number",
  "indexFullness": "number (0-1)",
  "namespaces": {
    "[namespace_id]": {
      "vectorCount": "number"
    }
  },
  "totalVectorCount": "number"
}
```
