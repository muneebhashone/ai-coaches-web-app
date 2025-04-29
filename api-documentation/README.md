# API Documentation

This folder contains API documentation for the Julia Coach AI Backend.

## Modules

- [Client API](client-api.md) - Endpoints for managing client profiles
- [Chatbot API](chatbot-api.md) - Endpoints for managing AI chatbots
- [Session API](session-api.md) - Endpoints for managing chat sessions between chatbots and clients

## Authentication

All endpoints require authentication via a JWT token. The token should be included in the Authorization header as a Bearer token:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true|false,
  "message": "Optional message about the request",
  "data": {
    // Response data specific to the endpoint
  }
}
```

## Error Handling

When an error occurs, the API will return an appropriate HTTP status code along with a response in the following format:

```json
{
  "success": false,
  "message": "Description of the error",
  "errors": [
    // Optional array of specific error details
  ]
}
```

## Common Status Codes

- `200 OK`: Request was successful
- `201 Created`: Resource was successfully created
- `400 Bad Request`: Invalid parameters or request data
- `401 Unauthorized`: Authentication is required or has failed
- `403 Forbidden`: Authentication succeeded but user lacks required permissions
- `404 Not Found`: The requested resource was not found
- `422 Unprocessable Entity`: Validation errors
- `500 Internal Server Error`: Server encountered an error

## Pagination

List endpoints support pagination with the following query parameters:
- `limit`: Number of results per page (default: 10)
- `skip`: Number of records to skip (default: 0)

Paginated responses include a `paginatorInfo` object with metadata about the pagination: