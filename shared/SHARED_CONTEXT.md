# Shared Context - Todo Fullstack Monorepo

## 📋 Project Overview
Full-stack Todo application with blog functionality powered by CMS

**Purpose:** 
- Learn Claude Code workflow
- Practice AI-assisted development
- Build production-ready application

---

## 🏗️ Architecture
```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ↓
┌─────────────┐     ┌─────────────┐
│  Frontend   │────→│   Backend   │
│  (React)    │←────│   (Node.js) │
└─────────────┘     └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Database │ │  Cache   │ │   CMS    │
        │(SQLite)  │ │ (Redis)  │ │ (Strapi) │
        └──────────┘ └──────────┘ └──────────┘
```

---

## 🎯 Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **State:** Zustand
- **Forms:** React Hook Form + Yup
- **Styling:** Tailwind CSS
- **HTTP:** Axios
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** SQLite (dev), PostgreSQL (production)
- **Validation:** Joi
- **Auth:** JWT + bcrypt
- **Testing:** Jest + Supertest
- **Logging:** Winston

### CMS
- **Platform:** Strapi 4
- **Database:** SQLite (shared with backend)
- **API:** REST

---

## 📦 Monorepo Structure
```
todo-fullstack-monorepo/
├── frontend/           # React application
├── backend/            # Express API
├── cms/               # Strapi CMS
├── shared/            # Shared contracts & docs
├── docs/              # Additional documentation
└── .gitignore
```

---

## 🌍 Environments

### Development
```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
CMS:       http://localhost:1337
```

### Production (Future)
```
Frontend:  https://app.example.com
Backend:   https://api.example.com
CMS:       https://cms.example.com (admin only)
```

---

## 🔑 Common Rules

### 1. API Communication
- All communication via REST API
- JSON format only
- JWT in `Authorization: Bearer {token}`
- Follow API_CONTRACT.md strictly

### 2. Data Formats
- Dates: ISO 8601 (`2025-01-14T10:00:00Z`)
- IDs: UUIDs (v4)
- Timestamps: Always include timezone

### 3. Response Format
**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable",
    "details": {}
  }
}
```

### 4. HTTP Status Codes
- 200: Success (GET, PUT)
- 201: Created (POST)
- 204: No Content (DELETE)
- 400: Bad Request (validation)
- 401: Unauthorized (no/invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Rate Limited
- 500: Internal Server Error

---

## 🔐 Security

### Authentication
- JWT tokens (7-day expiry)
- Refresh tokens (30-day expiry)
- bcrypt for password hashing (10 rounds)
- Secrets in `.env` files

### Validation
- Joi schemas on backend
- Yup schemas on frontend
- Sanitize all inputs
- Parameterized database queries

### Headers
- Helmet.js for security headers
- CORS whitelist in production
- Rate limiting: 100 req/min

---

## 🗄️ Database Schema

### Users
```sql
id          UUID PRIMARY KEY
username    VARCHAR(50) UNIQUE NOT NULL
email       VARCHAR(255) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL (hashed)
role        VARCHAR(20) DEFAULT 'user'
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

### Todos
```sql
id          UUID PRIMARY KEY
user_id     UUID FOREIGN KEY → users(id)
title       VARCHAR(200) NOT NULL
description TEXT
status      VARCHAR(20) DEFAULT 'pending'
priority    INTEGER DEFAULT 0
due_date    TIMESTAMP
deleted_at  TIMESTAMP (soft delete)
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

---

## 🧪 Testing Standards

### Backend
- Unit tests: >85% coverage
- Integration tests: all endpoints
- Security tests
- Load tests: 500 concurrent users

### Frontend
- Component tests: >80% coverage
- Integration tests
- E2E tests: critical flows

---

## 📝 Documentation Requirements

Each package must have:
- `CLAUDE.md` - AI learning log
- `README.md` - Setup & usage
- `.env.example` - Environment variables
- Code comments for complex logic

---

## 🚀 Development Workflow

1. Create feature branch
2. Use Claude Code for development
3. Run tests
4. Update CLAUDE.md
5. Create PR
6. Review & merge

---

## 🎓 Learning Goals

- [ ] Understand monorepo structure
- [ ] Master Claude Code workflow
- [ ] Learn API contract design
- [ ] Practice TDD
- [ ] Build production-ready app

---

## 📊 Success Metrics

- All tests pass (>85% coverage)
- Zero security vulnerabilities
- API response < 100ms
- Lighthouse score > 90
- Complete documentation
