# Programs API

**Base URL:** `http://localhost:PORT/api/programs`

## Routes

### GET /

Get paginated list of programs for user

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in name, description)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - active: string (optional, "true" for active programs only)
  - chatbotId: string (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Programs retrieved successfully",
  "data": {
    "programs": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Executive Leadership Development",
        "description": "A comprehensive 12-week program focusing on developing executive leadership skills and strategic thinking",
        "purpose": "To develop high-performing leaders who can drive organizational change and innovation",
        "goals": "Improve decision-making abilities, enhance team management skills, develop strategic vision",
        "successMetrics": "360-degree feedback scores, leadership assessment results, team performance metrics",
        "chatbotId": "6743a2f123d45e001234567b",
        "active": true,
        "user": "6743a2f123d45e001234567c",
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:30:00.000Z"
      },
      {
        "_id": "6743a2f123d45e001234567d",
        "name": "Communication Mastery",
        "description": "8-week intensive program to improve communication and presentation skills",
        "purpose": "To help professionals communicate more effectively in all business contexts",
        "goals": "Enhance public speaking, improve written communication, develop active listening skills",
        "successMetrics": "Presentation assessment scores, peer feedback, communication effectiveness ratings",
        "chatbotId": "6743a2f123d45e001234567b",
        "active": true,
        "user": "6743a2f123d45e001234567c",
        "createdAt": "2024-01-10T08:30:00.000Z",
        "updatedAt": "2024-01-10T08:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 12,
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

Create new program

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - name: string (required)
  - description: string (optional)
  - purpose: string (optional)
  - goals: string (optional)
  - successMetrics: string (optional)
  - chatbotId: string (required)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Program created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Executive Leadership Development",
    "description": "A comprehensive 12-week program focusing on developing executive leadership skills and strategic thinking",
    "purpose": "To develop high-performing leaders who can drive organizational change and innovation",
    "goals": "Improve decision-making abilities, enhance team management skills, develop strategic vision",
    "successMetrics": "360-degree feedback scores, leadership assessment results, team performance metrics",
    "chatbotId": "6743a2f123d45e001234567b",
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
      "message": "Program name is required"
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

Get program by ID

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Program retrieved successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Executive Leadership Development",
    "description": "A comprehensive 12-week program focusing on developing executive leadership skills and strategic thinking",
    "purpose": "To develop high-performing leaders who can drive organizational change and innovation",
    "goals": "Improve decision-making abilities, enhance team management skills, develop strategic vision",
    "successMetrics": "360-degree feedback scores, leadership assessment results, team performance metrics",
    "chatbotId": "6743a2f123d45e001234567b",
    "active": true,
    "user": "6743a2f123d45e001234567c",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T08:30:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Program not found"
}
```

### PUT /:id

Update program information

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - description: string (optional)
  - purpose: string (optional)
  - goals: string (optional)
  - successMetrics: string (optional)
  - active: boolean (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Program updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Advanced Executive Leadership Development",
    "description": "An enhanced 16-week program focusing on developing executive leadership skills and strategic thinking",
    "purpose": "To develop high-performing leaders who can drive organizational change and innovation",
    "goals": "Improve decision-making abilities, enhance team management skills, develop strategic vision, master change management",
    "successMetrics": "360-degree feedback scores, leadership assessment results, team performance metrics, ROI measurements",
    "chatbotId": "6743a2f123d45e001234567b",
    "active": true,
    "user": "6743a2f123d45e001234567c",
    "createdAt": "2024-01-15T08:30:00.000Z",
    "updatedAt": "2024-01-15T09:15:00.000Z"
  }
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Program not found"
}
```

### DELETE /:id

Delete program

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Program deleted successfully"
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Program not found"
}
```

- **400 Bad Request:**
```json
{
  "success": false,
  "message": "Cannot delete program with active sessions"
}
```

## Data Schemas

### Program Object
```json
{
  "_id": "string",
  "name": "string",
  "description": "string | null",
  "purpose": "string | null",
  "goals": "string | null",
  "successMetrics": "string | null",
  "chatbotId": "string",
  "active": "boolean",
  "user": "string",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```
