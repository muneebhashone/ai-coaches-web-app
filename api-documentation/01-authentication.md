# Authentication API

**Base URL:** `http://localhost:PORT/api/auth`

## Routes

### POST /login/email

Login user with email and password

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - email: string (required, valid email)
  - password: string (required)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "Invalid credentials",
    "data": {}
  }
  ```

### POST /register/email

Register new user with email

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - name: string (required)
  - email: string (required, valid email)
  - password: string (required, min 8 chars, uppercase, lowercase, number, special char)
  - confirmPassword: string (required, must match password)

**Response:**
- **Success (201):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "DEFAULT_USER",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
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

### POST /register/coach

Register new coach with additional metadata

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - name: string (required)
  - email: string (required, valid email)
  - password: string (required, min 8 chars, uppercase, lowercase, number, special char)
  - confirmPassword: string (required, must match password)
  - expertise: string (required)
  - bio: string (required)

**Response:**
- **Success (201):**
  ```json
  {
    "success": true,
    "message": "Coach registered successfully",
    "data": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dr. Jane Smith",
      "email": "jane@example.com",
      "role": "COACH",
      "expertise": "Life Coaching",
      "bio": "Experienced life coach with 10+ years in personal development",
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
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

### POST /logout

Logout current user

- **Method:** POST
- **Authentication:** Not required

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### GET /me

Get current authenticated user information

- **Method:** GET
- **Authentication:** Required

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "User information retrieved",
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "role": "DEFAULT_USER",
      "iat": 1638360000,
      "exp": 1638446400
    }
  }
  ```
- **Error (401):**
  ```json
  {
    "success": false,
    "message": "Invalid or expired token",
    "data": {}
  }
  ```

### POST /forget-password

Request password reset code

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - email: string (required, valid email)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Password reset code sent to email",
    "data": {
      "userId": "507f1f77bcf86cd799439011"
    }
  }
  ```
- **Error (404):**
  ```json
  {
    "success": false,
    "message": "User not found",
    "data": {}
  }
  ```

### POST /change-password

Change password for authenticated user

- **Method:** POST
- **Authentication:** Required
- **Body:**
  - currentPassword: string (required)
  - newPassword: string (required, min 8 chars, uppercase, lowercase, number, special char)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "Current password is incorrect",
    "data": {}
  }
  ```

### POST /reset-password

Reset password using code from email

- **Method:** POST
- **Authentication:** Not required
- **Body:**
  - userId: string (required, valid MongoDB ID)
  - code: string (required, 4 alphanumeric characters)
  - password: string (required, min 8 chars, uppercase, lowercase, number, special char)
  - confirmPassword: string (required, must match password)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Password reset successfully"
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "Invalid or expired reset code",
    "data": {}
  }
  ```

### GET /google

Initiate Google OAuth login

- **Method:** GET
- **Authentication:** Not required

**Response:**
- **Success (302):** Redirects to Google OAuth consent screen

### GET /google/callback

Handle Google OAuth callback

- **Method:** GET
- **Authentication:** Not required
- **Query:**
  - code: string (OAuth authorization code)
  - error: string (optional, OAuth error)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Google login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "OAuth authentication failed",
    "data": {}
  }
  ```

### GET /kakao

Initiate Kakao OAuth login

- **Method:** GET
- **Authentication:** Not required

**Response:**
- **Success (302):** Redirects to Kakao OAuth consent screen

### GET /kakao/callback

Handle Kakao OAuth callback

- **Method:** GET
- **Authentication:** Not required
- **Query:**
  - code: string (OAuth authorization code)
  - state: string (CSRF protection token)
  - error: string (optional, OAuth error)

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Kakao login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error (400):**
  ```json
  {
    "success": false,
    "message": "OAuth authentication failed",
    "data": {}
  }

## Common Response Format

All API responses follow this standard format:

```json
{
  "success": boolean,
  "message": string (optional),
  "data": object (optional)
}
```

## Error Codes

- **400 Bad Request:** Invalid input data or business logic errors
- **401 Unauthorized:** Invalid or missing authentication token
- **404 Not Found:** User not found or resource doesn't exist
- **500 Internal Server Error:** Server-side errors
