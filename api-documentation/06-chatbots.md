# Chatbots API

**Base URL:** `http://localhost:PORT/api/chatbots`

## Routes

### GET /

Get paginated list of chatbots for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in name, description)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - active: string (optional, "true" for active chatbots only)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "name": "Life Coach Julia",
        "description": "Personal development and goal achievement coaching bot",
        "active": true,
        "knowledgeBaseId": "64a1b2c3d4e5f6789abcdef1",
        "humanMimicryId": "64a1b2c3d4e5f6789abcdef2",
        "programId": "64a1b2c3d4e5f6789abcdef3",
        "userId": "64a1b2c3d4e5f6789abcdef4",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T12:45:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
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
  "message": "Invalid query parameters",
  "error": "limitParam must be a positive integer"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### POST /

Create new chatbot with program and sessions

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - name: string (required)
  - description: string (optional)
  - programName: string (required)
  - programDescription: string (optional)
  - programPurpose: string (optional)
  - programGoals: string (optional)
  - programSuccessMetrics: string (optional)
  - sessions: array (optional)
    - name: string (required)
    - duration: string (required)
    - sessionDate: string (required, ISO datetime)

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "name": "Life Coach Julia",
    "description": "Personal development and goal achievement coaching bot",
    "active": true,
    "knowledgeBaseId": null,
    "humanMimicryId": null,
    "programId": "64a1b2c3d4e5f6789abcdef3",
    "userId": "64a1b2c3d4e5f6789abcdef4",
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
  "error": "name is required"
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
  "message": "Failed to create chatbot and program"
}
```

### GET /:id

Get chatbot by ID

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
    "name": "Life Coach Julia",
    "description": "Personal development and goal achievement coaching bot",
    "active": true,
    "knowledgeBaseId": "64a1b2c3d4e5f6789abcdef1",
    "humanMimicryId": "64a1b2c3d4e5f6789abcdef2",
    "programId": "64a1b2c3d4e5f6789abcdef3",
    "userId": "64a1b2c3d4e5f6789abcdef4",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:45:00.000Z"
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
  "message": "Chatbot not found"
}
```

### PUT /:id

Update chatbot information

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - description: string (optional)
  - active: boolean (optional)
  - knowledgeBaseId: string (optional)
  - humanMimicryId: string (optional)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "name": "Advanced Life Coach Julia",
    "description": "Enhanced personal development and goal achievement coaching bot",
    "active": true,
    "knowledgeBaseId": "64a1b2c3d4e5f6789abcdef1",
    "humanMimicryId": "64a1b2c3d4e5f6789abcdef2",
    "programId": "64a1b2c3d4e5f6789abcdef3",
    "userId": "64a1b2c3d4e5f6789abcdef4",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T14:20:00.000Z"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid ID format or validation failed"
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
  "message": "Chatbot not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to update chatbot"
}
```

### DELETE /:id

Delete chatbot and all related data

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "message": "Chatbot and all related data deleted successfully"
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
  "message": "Chatbot not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to delete chatbot"
}
```

## Data Schemas

### Chatbot Object
```json
{
  "_id": "string (MongoDB ObjectId)",
  "name": "string",
  "description": "string | null",
  "active": "boolean",
  "knowledgeBaseId": "string | null (MongoDB ObjectId)",
  "humanMimicryId": "string | null (MongoDB ObjectId)",
  "programId": "string (MongoDB ObjectId)",
  "userId": "string (MongoDB ObjectId)",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```
