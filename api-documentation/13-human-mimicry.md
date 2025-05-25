# Human Mimicry API

**Base URL:** `http://localhost:PORT/api/chatbots/:chatbotId/human-mimicry`

## Routes

### GET /

Get paginated list of human mimicry data for chatbot

- **Method:** GET
- **Authentication:** Required
- **Params:**
  - chatbotId: string (required, valid MongoDB ID)
- **Query:**
  - searchString: string (optional, search in name, description)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Human mimicry data retrieved successfully",
  "data": {
    "humanMimicryData": [
      {
        "_id": "6743a2f123d45e001234567a",
        "name": "Executive Communication Style",
        "description": "Professional communication patterns for executive-level coaching",
        "toneExample": "Confident, direct, yet empathetic. Uses strategic vocabulary and speaks with authority while maintaining approachability.",
        "styleExample": "Structured responses with clear frameworks. Often uses analogies and real-world examples to illustrate points.",
        "writingExample": "Let's examine this challenge through a strategic lens. Consider three key factors: market dynamics, team capabilities, and resource allocation. How might we approach each of these systematically?",
        "transcripts": "Coach: What specific outcome are you hoping to achieve? Client: I need to improve my team's performance. Coach: That's a worthy goal. Let's break this down into measurable components...",
        "personality": {
          "tone": "professional",
          "style": "structured",
          "approach": "consultative"
        },
        "chatbotId": "6743a2f123d45e001234567b",
        "user": "6743a2f123d45e001234567c",
        "active": true,
        "createdAt": "2024-01-15T08:30:00.000Z",
        "updatedAt": "2024-01-15T08:30:00.000Z"
      },
      {
        "_id": "6743a2f123d45e001234567d",
        "name": "Empathetic Mentor Style",
        "description": "Warm, supportive communication patterns for personal development coaching",
        "toneExample": "Warm, encouraging, patient. Uses inclusive language and validates emotions while gently challenging growth areas.",
        "styleExample": "Reflective questions, active listening responses, and gentle guidance. Often acknowledges feelings before offering solutions.",
        "writingExample": "I hear that this situation is really weighing on you. It's completely understandable to feel overwhelmed when facing such significant changes. What would feel like the most supportive next step for you right now?",
        "transcripts": "Coach: How are you feeling about this challenge? Client: Honestly, pretty stressed. Coach: That makes complete sense. Change can be really difficult. What part feels most manageable to start with?",
        "personality": {
          "tone": "empathetic",
          "style": "supportive",
          "approach": "person-centered"
        },
        "chatbotId": "6743a2f123d45e001234567b",
        "user": "6743a2f123d45e001234567c",
        "active": true,
        "createdAt": "2024-01-12T08:30:00.000Z",
        "updatedAt": "2024-01-12T08:30:00.000Z"
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

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Chatbot not found"
}
```

### POST /

Create new human mimicry data for chatbot

- **Method:** POST
- **Authentication:** Required
- **Params:**
  - chatbotId: string (required, valid MongoDB ID)
- **Body:**
  - name: string (required)
  - description: string (optional)
  - toneExample: string (optional)
  - styleExample: string (optional)
  - writingExample: string (optional)
  - transcripts: string (optional)

**Response:**
- **201 Created:**
```json
{
  "success": true,
  "message": "Human mimicry data created successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Executive Communication Style",
    "description": "Professional communication patterns for executive-level coaching",
    "toneExample": "Confident, direct, yet empathetic. Uses strategic vocabulary and speaks with authority while maintaining approachability.",
    "styleExample": "Structured responses with clear frameworks. Often uses analogies and real-world examples to illustrate points.",
    "writingExample": "Let's examine this challenge through a strategic lens. Consider three key factors: market dynamics, team capabilities, and resource allocation. How might we approach each of these systematically?",
    "transcripts": "Coach: What specific outcome are you hoping to achieve? Client: I need to improve my team's performance. Coach: That's a worthy goal. Let's break this down into measurable components...",
    "personality": {
      "tone": "professional",
      "style": "structured",
      "approach": "consultative"
    },
    "chatbotId": "6743a2f123d45e001234567b",
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
      "message": "Human mimicry name is required"
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

### PUT /:id

Update human mimicry data

- **Method:** PUT
- **Authentication:** Required
- **Params:**
  - chatbotId: string (required, valid MongoDB ID)
  - id: string (required, valid MongoDB ID)
- **Body:**
  - name: string (optional)
  - description: string (optional)
  - toneExample: string (optional)
  - styleExample: string (optional)
  - writingExample: string (optional)
  - transcripts: string (optional)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Human mimicry data updated successfully",
  "data": {
    "_id": "6743a2f123d45e001234567a",
    "name": "Advanced Executive Communication Style",
    "description": "Enhanced professional communication patterns for senior executive-level coaching",
    "toneExample": "Confident, direct, yet empathetic. Uses strategic vocabulary and speaks with authority while maintaining approachability.",
    "styleExample": "Structured responses with clear frameworks. Often uses analogies and real-world examples to illustrate points.",
    "writingExample": "Let's examine this challenge through a strategic lens. Consider three key factors: market dynamics, team capabilities, and resource allocation. How might we approach each of these systematically?",
    "transcripts": "Coach: What specific outcome are you hoping to achieve? Client: I need to improve my team's performance. Coach: That's a worthy goal. Let's break this down into measurable components...",
    "personality": {
      "tone": "professional",
      "style": "structured",
      "approach": "consultative"
    },
    "chatbotId": "6743a2f123d45e001234567b",
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
  "message": "Human mimicry data not found"
}
```

### DELETE /:id

Delete human mimicry data

- **Method:** DELETE
- **Authentication:** Required
- **Params:**
  - chatbotId: string (required, valid MongoDB ID)
  - id: string (required, valid MongoDB ID)

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Human mimicry data deleted successfully"
}
```

- **404 Not Found:**
```json
{
  "success": false,
  "message": "Human mimicry data not found"
}
```

- **409 Conflict:**
```json
{
  "success": false,
  "message": "Cannot delete human mimicry data - chatbot is currently being trained"
}
```

## Data Schemas

### Human Mimicry Object
```json
{
  "_id": "string",
  "name": "string",
  "description": "string | null",
  "toneExample": "string | null",
  "styleExample": "string | null",
  "writingExample": "string | null",
  "transcripts": "string | null",
  "personality": {
    "tone": "string",
    "style": "string",
    "approach": "string"
  },
  "chatbotId": "string",
  "user": "string",
  "active": "boolean",
  "createdAt": "string (ISO datetime)",
  "updatedAt": "string (ISO datetime)"
}
```

### Personality Configuration
```json
{
  "tone": "professional | empathetic | casual | authoritative | supportive",
  "style": "structured | conversational | analytical | creative | direct",
  "approach": "consultative | directive | collaborative | person-centered | solution-focused"
}
```
