# Knowledge Base API Documentation

This document describes the API endpoints for managing Knowledge Bases and their associated documents.

## Base Path

```
/knowledge-base
```

## Endpoints

### Create Knowledge Base

Creates a new knowledge base.

**Endpoint:** `POST /knowledge-base`

**Authentication:** Required

**Request Body:**

```typescript
{
  name: string;
  description?: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  message: string; // "Knowledge base created successfully"
  data: {
    id: string;
    knowledgeBaseIndexId: string;
    knowledgeBaseNameSpace: string;
    name: string;
    description?: string;
    documents?: Array<{
      name: string;
      mimeType: string;
      size: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**

- `201 Created`: Knowledge base successfully created
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error

---

### Get Knowledge Bases

Retrieves all knowledge bases with pagination.

**Endpoint:** `GET /knowledge-base`

**Authentication:** Required

**Query Parameters:**

- `limitParam` (optional): Number of results per page (default: 10)
- `pageParam` (optional): Page number (default: 1)
- `searchString` (optional): Search term to filter knowledge bases

**Response:**

```typescript
{
  success: boolean;
  data: {
    results: Array<{
      id: string;
      knowledgeBaseIndexId: string;
      knowledgeBaseNameSpace: string;
      name: string;
      description?: string;
      documents?: Array<{
        name: string;
        mimeType: string;
        size: number;
        content: string;
        createdAt: string;
        updatedAt: string;
      }>;
      createdAt: string;
      updatedAt: string;
    }>;
    paginatorInfo: {
      currentPage: number;
      perPage: number;
      firstPage: number;
      lastPage: number;
      total: number;
      from: number;
      to: number;
      hasMorePages: boolean;
    }
  }
}
```

**Status Codes:**

- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `500 Internal Server Error`: Server error

---

### Get Knowledge Base

Retrieves a specific knowledge base by ID.

**Endpoint:** `GET /knowledge-base/:id`

**Authentication:** Required

**Path Parameters:**

- `id`: Knowledge Base ID (MongoDB ObjectId)

**Response:**

```typescript
{
  success: boolean;
  data: {
    id: string;
    knowledgeBaseIndexId: string;
    knowledgeBaseNameSpace: string;
    name: string;
    description?: string;
    documents?: Array<{
      name: string;
      mimeType: string;
      size: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**

- `200 OK`: Success
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Knowledge base not found
- `500 Internal Server Error`: Server error

---

### Delete Knowledge Base

Deletes a knowledge base by ID.

**Endpoint:** `DELETE /knowledge-base/:id`

**Authentication:** Required

**Path Parameters:**

- `id`: Knowledge Base ID (MongoDB ObjectId)

**Response:**

```typescript
{
  success: boolean;
  message: string; // "Knowledge base deleted successfully"
}
```

**Status Codes:**

- `200 OK`: Knowledge base successfully deleted
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Knowledge base not found
- `500 Internal Server Error`: Server error

---

### Add Document to Knowledge Base

Adds a document to an existing knowledge base.

**Endpoint:** `POST /knowledge-base/:id/document`

**Authentication:** Required

**Path Parameters:**

- `id`: Knowledge Base ID (MongoDB ObjectId)

**Request Body:**

```typescript
{
  name: string;
  mimeType: string;
  size: number; // Positive number
  content: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  message: string; // "Document added to knowledge base successfully"
  data: {
    id: string;
    knowledgeBaseIndexId: string;
    knowledgeBaseNameSpace: string;
    name: string;
    description?: string;
    documents: Array<{
      name: string;
      mimeType: string;
      size: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**

- `200 OK`: Document successfully added
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Knowledge base not found
- `500 Internal Server Error`: Server error

---

### Upload Document to Knowledge Base

Uploads a document file to a knowledge base.

**Endpoint:** `POST /knowledge-base/:id/upload`

**Authentication:** Required

**Path Parameters:**

- `id`: Knowledge Base ID (MongoDB ObjectId)

**Request Body (Form Data):**

- `document`: File to upload

**Supported File Types:**

- PDF (application/pdf)
- Word (.docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document)
- Excel (.xlsx - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel)
- CSV (text/csv)
- Text files (.txt - text/plain)

**Response:**

```typescript
{
  success: boolean;
  message: string; // "Document uploaded to knowledge base successfully"
  data: {
    id: string;
    knowledgeBaseIndexId: string;
    knowledgeBaseNameSpace: string;
    name: string;
    description?: string;
    documents: Array<{
      name: string;
      mimeType: string;
      size: number;
      content: string;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }
}
```

**Status Codes:**

- `200 OK`: Document successfully uploaded
- `400 Bad Request`: Invalid file or file type
- `401 Unauthorized`: Authentication missing or invalid
- `404 Not Found`: Knowledge base not found
- `500 Internal Server Error`: Server error

## Example Usage

### Create Knowledge Base

```bash
curl -X POST \
  http://localhost:3000/knowledge-base \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Product Documentation",
    "description": "Knowledge base for all product documentation"
  }'
```

### Upload Document

```bash
curl -X POST \
  http://localhost:3000/knowledge-base/60f7b0b3e6b3a72d8c9d1234/upload \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -F 'document=@/path/to/your/document.pdf'
```
