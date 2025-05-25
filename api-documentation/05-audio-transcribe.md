# Audio Transcribe API

**Base URL:** `http://localhost:PORT/api/audio-transcribe`

## Routes

### GET /

Get paginated list of audio transcriptions for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in fileName)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - filterByStatus: enum (optional, "not-started" | "pending" | "completed" | "failed")

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "fileName": "interview_session_1.mp3",
        "fileSize": 15728640,
        "fileUrl": "https://s3.amazonaws.com/bucket/audio/interview_session_1.mp3",
        "status": "completed",
        "transcript": "Hello, welcome to today's session...",
        "duration": 1847,
        "processingTime": 23.4,
        "userId": "64a1b2c3d4e5f6789abcdef1",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:35:23.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
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

Create new audio transcription job

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - fileName: string (required)
  - fileSize: number (required, positive)
  - fileUrl: string (required, valid URL)

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "fileName": "interview_session_1.mp3",
    "fileSize": 15728640,
    "fileUrl": "https://s3.amazonaws.com/bucket/audio/interview_session_1.mp3",
    "status": "not-started",
    "transcript": null,
    "duration": null,
    "processingTime": null,
    "userId": "64a1b2c3d4e5f6789abcdef1",
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
  "error": "fileName is required"
}
```
- **401 Unauthorized**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### GET /stats

Get processing statistics for user

- **Method:** GET
- **Authentication:** Required

**Response:**
- **200 OK**
```json
{
  "success": true,
  "data": {
    "totalTranscriptions": 47,
    "completedTranscriptions": 42,
    "pendingTranscriptions": 3,
    "failedTranscriptions": 2,
    "totalProcessingTime": 1847.5,
    "averageProcessingTime": 43.9,
    "totalAudioDuration": 125640,
    "totalFileSize": 2147483648
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

### GET /:id

Get specific audio transcription by ID

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
    "fileName": "interview_session_1.mp3",
    "fileSize": 15728640,
    "fileUrl": "https://s3.amazonaws.com/bucket/audio/interview_session_1.mp3",
    "status": "completed",
    "transcript": "Hello, welcome to today's session. Today we'll be discussing your goals and aspirations...",
    "duration": 1847,
    "processingTime": 23.4,
    "userId": "64a1b2c3d4e5f6789abcdef1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:23.000Z"
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
  "message": "Audio transcription not found"
}
```

### GET /:id/transcript

Get transcript content as text

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
    "transcript": "Hello, welcome to today's session. Today we'll be discussing your goals and aspirations. I'm excited to work with you on developing a comprehensive coaching plan that will help you achieve your objectives. Let's start by talking about what brought you here today and what you hope to accomplish through our coaching relationship."
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
  "message": "Audio transcription not found or transcript not available"
}
```

### POST /:id/to-knowledge-base

Copy transcript to knowledge base

- **Method:** POST
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - knowledgeBaseId: string (required)
  - description: string (optional)

**Response:**
- **201 Created**
```json
{
  "success": true,
  "data": {
    "documentId": "64a1b2c3d4e5f6789abcdef2",
    "message": "Transcript successfully copied to knowledge base"
  }
}
```
- **400 Bad Request**
```json
{
  "success": false,
  "message": "Invalid ID format or missing knowledgeBaseId"
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
  "message": "Audio transcription or knowledge base not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to copy transcript to knowledge base"
}
```

### DELETE /:id

Delete audio transcription

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK**
```json
{
  "success": true,
  "message": "Audio transcription deleted successfully"
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
  "message": "Audio transcription not found"
}
```
- **500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to delete audio transcription"
}
```

## Data Schemas

### AudioTranscribe Object
```json
{
  "_id": "string (MongoDB ObjectId)",
  "fileName": "string",
  "fileSize": "number (bytes)",
  "fileUrl": "string (S3 URL)",
  "status": "enum (not-started | pending | completed | failed)",
  "transcript": "string | null",
  "duration": "number | null (seconds)",
  "processingTime": "number | null (seconds)",
  "userId": "string (MongoDB ObjectId)",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Processing Stats Object
```json
{
  "totalTranscriptions": "number",
  "completedTranscriptions": "number",
  "pendingTranscriptions": "number",
  "failedTranscriptions": "number",
  "totalProcessingTime": "number (seconds)",
  "averageProcessingTime": "number (seconds)",
  "totalAudioDuration": "number (seconds)",
  "totalFileSize": "number (bytes)"
}
```
