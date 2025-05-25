# Client Kakao Integration API

**Base URL:** `http://localhost:PORT/api/clients/kakao`

## Routes

### GET /login

Initiate KakaoTalk OAuth login for clients

- **Method:** GET
- **Authentication:** Not required

**Response:**
- **302 Found (Redirect):**
```
Location: https://kauth.kakao.com/oauth/authorize?client_id=YOUR_APP_KEY&redirect_uri=YOUR_REDIRECT_URI&response_type=code&state=CSRF_TOKEN
```

- **500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to initialize Kakao OAuth"
}
```

### GET /callback

Handle KakaoTalk OAuth callback for client registration/login

- **Method:** GET
- **Authentication:** Not required
- **Query:**
  - code: string (required, OAuth authorization code)
  - state: string (required, CSRF protection token)
  - error: string (optional, OAuth error)

**Response:**
- **200 OK (Success):**
```json
{
  "success": true,
  "message": "Client authenticated successfully",
  "data": {
    "client": {
      "_id": "6743a2f123d45e001234567a",
      "name": "김영희",
      "kakaoId": "kakao_user_12345",
      "metadata": {
        "email": "younghee.kim@kakao.com",
        "phone": null
      },
      "activeProgramId": null,
      "user": "6743a2f123d45e001234567c",
      "active": true,
      "createdAt": "2024-01-15T08:30:00.000Z",
      "updatedAt": "2024-01-15T08:30:00.000Z"
    },
    "isNewClient": false,
    "redirectUrl": "/client-dashboard"
  }
}
```

- **200 OK (New Client Created):**
```json
{
  "success": true,
  "message": "New client created successfully",
  "data": {
    "client": {
      "_id": "6743a2f123d45e001234567d",
      "name": "박민수",
      "kakaoId": "kakao_user_67890",
      "metadata": {
        "email": "minsu.park@kakao.com",
        "phone": null
      },
      "activeProgramId": null,
      "user": "6743a2f123d45e001234567c",
      "active": true,
      "createdAt": "2024-01-15T09:00:00.000Z",
      "updatedAt": "2024-01-15T09:00:00.000Z"
    },
    "isNewClient": true,
    "redirectUrl": "/client-onboarding"
  }
}
```

- **400 Bad Request:**
```json
{
  "success": false,
  "message": "OAuth error: access_denied",
  "error": "User denied authorization"
}
```

- **401 Unauthorized:**
```json
{
  "success": false,
  "message": "Invalid or expired authorization code"
}
```

- **500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to process Kakao OAuth callback"
}
```

### GET /info

Get information about KakaoTalk integration status

- **Method:** GET
- **Authentication:** Not required

**Response:**
- **200 OK:**
```json
{
  "success": true,
  "message": "Kakao integration info retrieved successfully",
  "data": {
    "isConfigured": true,
    "clientId": "YOUR_KAKAO_APP_KEY",
    "redirectUri": "http://localhost:3000/api/clients/kakao/callback",
    "scopes": ["profile_nickname", "profile_image", "account_email"],
    "loginUrl": "/api/clients/kakao/login",
    "supportedFeatures": [
      "oauth_login",
      "profile_sync",
      "auto_registration"
    ]
  }
}
```

- **500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Kakao integration not properly configured"
}
```

## Data Schemas

### Kakao Client Response
```json
{
  "client": {
    "_id": "string",
    "name": "string",
    "kakaoId": "string",
    "metadata": {
      "email": "string | null",
      "phone": "string | null"
    },
    "activeProgramId": "string | null",
    "user": "string",
    "active": "boolean",
    "createdAt": "string (ISO datetime)",
    "updatedAt": "string (ISO datetime)"
  },
  "isNewClient": "boolean",
  "redirectUrl": "string"
}
```

### Kakao Integration Info
```json
{
  "isConfigured": "boolean",
  "clientId": "string",
  "redirectUri": "string",
  "scopes": ["string"],
  "loginUrl": "string",
  "supportedFeatures": ["string"]
}
```
