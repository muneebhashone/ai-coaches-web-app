# Users API

**Base URL:** `http://localhost:PORT/api/users`

## Routes

### GET /

Get paginated list of users

- **Method:** GET
- **Authentication:** Required
- **Query:**
  - searchString: string (optional, search in firstName, lastName, email)
  - limitParam: string (optional, default: "10", positive integer)
  - pageParam: string (optional, default: "1", positive integer)
  - filterByRole: enum (optional, "DEFAULT_USER" | "COACH" | "SUPER_ADMIN")

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "data": {
      "results": [
        {
          "_id": "507f1f77bcf86cd799439011",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "DEFAULT_USER",
          "createdAt": "2023-12-01T10:00:00.000Z",
          "updatedAt": "2023-12-01T10:00:00.000Z"
        }
      ],
      "paginatorInfo": {
        "currentPage": 1,
        "totalPages": 5,
        "totalCount": 50,
        "hasNextPage": true,
        "hasPrevPage": false
      }
    }
  }
  ```
- **Error (401):**
  ```json
  {
    "success": false,
    "message": "Authentication required",
    "data": {}
  }
  ```

### POST /user

Create new user (admin only)

- **Method:** POST
- **Authentication:** Required (SUPER_ADMIN role)
- **Body:**
  - name: string (required)
  - email: string (required, valid email)
  - password: string (required, min 8 chars, uppercase, lowercase, number, special char)

**Response:**
- **Success (201):**
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "DEFAULT_USER",
      "createdAt": "2023-12-01T10:30:00.000Z",
      "updatedAt": "2023-12-01T10:30:00.000Z"
    }
  }
  ```
- **Error (403):**
  ```json
  {
    "success": false,
    "message": "Access denied. Super admin role required",
    "data": {}
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "Email already exists",
    "data": {}
  }
  ```

### POST /\_super-admin

Create super admin user (system initialization)

- **Method:** POST
- **Authentication:** Not required

**Response:**
- **Success (201):**
  ```json
  {
    "success": true,
    "message": "Super admin created successfully",
    "data": {
      "email": "admin@example.com",
      "password": "generated_password_123"
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "Super admin already exists",
    "data": {}
  }

## User Object Schema

```json
{
  "_id": "string (MongoDB ObjectId)",
  "name": "string",
  "email": "string",
  "role": "DEFAULT_USER | COACH | SUPER_ADMIN",
  "expertise": "string (coaches only)",
  "bio": "string (coaches only)",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)"
}
```

## Pagination Info Schema

```json
{
  "currentPage": "number",
  "totalPages": "number", 
  "totalCount": "number",
  "hasNextPage": "boolean",
  "hasPrevPage": "boolean"
}
```
