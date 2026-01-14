## Base URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/v1
- CMS: http://localhost:1337

## Authentication
All protected endpoints require JWT token:
```
Authorization: Bearer {token}
```

---

## 🔐 Auth Endpoints

### POST /auth/register
สมัครสมาชิกใหม่

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

**Validation Rules:**
- username: 3-50 chars, alphanumeric + underscore
- email: valid email format
- password: min 8 chars, must have uppercase, lowercase, number

---

### POST /auth/login
เข้าสู่ระบบ

**Request:**
```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

---

## ✅ Todo Endpoints

### GET /todos
ดึงรายการ todos (Protected)

**Query Parameters:**
- page: number (default: 1)
- limit: number (default: 10, max: 100)
- status: "pending" | "completed" | "all" (default: "all")
- search: string (search in title & description)
- sortBy: "createdAt" | "updatedAt" | "title" (default: "createdAt")
- order: "asc" | "desc" (default: "desc")

**Response (200):**
```json
{
  "success": true,
  "data": {
    "todos": [
      {
        "id": "uuid",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "pending",
        "priority": 1,
        "dueDate": "2025-01-20T00:00:00Z",
        "createdAt": "2025-01-14T10:00:00Z",
        "updatedAt": "2025-01-14T10:00:00Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

---

### POST /todos
สร้าง todo ใหม่ (Protected)

**Request:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": 1,
  "dueDate": "2025-01-20T00:00:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "priority": 1,
    "dueDate": "2025-01-20T00:00:00Z",
    "createdAt": "2025-01-14T10:00:00Z",
    "updatedAt": "2025-01-14T10:00:00Z"
  }
}
```

**Validation Rules:**
- title: required, 3-200 chars
- description: optional, max 1000 chars
- priority: optional, integer 0-5 (default: 0)
- dueDate: optional, valid ISO 8601 datetime

---

### GET /todos/:id
ดึง todo เดียว (Protected)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "priority": 1,
    "dueDate": "2025-01-20T00:00:00Z",
    "createdAt": "2025-01-14T10:00:00Z",
    "updatedAt": "2025-01-14T10:00:00Z"
  }
}
```

---

### PUT /todos/:id
แก้ไข todo (Protected)

**Request:**
```json
{
  "title": "Buy groceries (updated)",
  "status": "completed"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Buy groceries (updated)",
    "description": "Milk, eggs, bread",
    "status": "completed",
    "priority": 1,
    "dueDate": "2025-01-20T00:00:00Z",
    "createdAt": "2025-01-14T10:00:00Z",
    "updatedAt": "2025-01-14T12:30:00Z"
  }
}
```

---

### DELETE /todos/:id
ลบ todo (Protected)

**Response (204):**
No content

---

## 📝 Content Endpoints (from CMS)

### GET /content/articles
ดึงบทความทั้งหมด

**Query Parameters:**
- page: number
- limit: number
- category: string

**Response (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "uuid",
        "title": "How to be productive",
        "slug": "how-to-be-productive",
        "excerpt": "Tips for productivity...",
        "content": "Full article content...",
        "author": {
          "name": "John Doe",
          "avatar": "url"
        },
        "category": "Productivity",
        "publishedAt": "2025-01-14T10:00:00Z",
        "coverImage": "url"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 20
    }
  }
}
```

---

### GET /content/articles/:slug
ดึงบทความเดียว

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "How to be productive",
    "slug": "how-to-be-productive",
    "content": "Full markdown content...",
    "author": {
      "name": "John Doe",
      "bio": "Writer",
      "avatar": "url"
    },
    "category": "Productivity",
    "tags": ["productivity", "tips"],
    "publishedAt": "2025-01-14T10:00:00Z",
    "coverImage": "url"
  }
}
```

---

## 🏥 System Endpoints

### GET /health
Health check (Public)

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-14T10:00:00Z",
  "uptime": 123456,
  "services": {
    "database": "ok",
    "cache": "ok",
    "cms": "ok"
  }
}
```

---

## ❌ Error Format

All errors follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {},
    "timestamp": "2025-01-14T10:00:00Z"
  }
}
```

### Error Codes
- `VALIDATION_ERROR` (400): Invalid input
- `UNAUTHORIZED` (401): Missing or invalid token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Duplicate data
- `RATE_LIMIT` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error
- `SERVICE_UNAVAILABLE` (503): Service down

---

## 🔄 Data Types

### Todo Status
```typescript
type TodoStatus = "pending" | "completed"
```

### Priority Level
```typescript
type Priority = 0 | 1 | 2 | 3 | 4 | 5
// 0 = lowest, 5 = highest
```

### Date Format
All dates in ISO 8601: `2025-01-14T10:00:00Z`
