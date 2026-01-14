# Task: Todo Backend API

## Objective
สร้าง Express API ตาม API_CONTRACT.md ใน ../shared/

## Phase 1: Basic Setup (Round 1)

### Core Features
- Express server setup
- SQLite database
- Basic CRUD endpoints:
  - GET /api/v1/todos
  - POST /api/v1/todos
  - GET /api/v1/todos/:id
  - PUT /api/v1/todos/:id
  - DELETE /api/v1/todos/:id

### Technical Requirements
- Express.js framework
- SQLite database (better-sqlite3)
- Joi validation
- Error handling middleware
- CORS enabled
- Request logging

### Project Structure
```
backend/
├── src/
│   ├── app.js              # Express app
│   ├── server.js           # Entry point
│   ├── routes/
│   │   └── todos.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── todoModel.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   └── utils/
│       └── database.js
├── tests/
│   └── todos.test.js
├── .env.example
├── package.json
├── CLAUDE.md              # Learning log
└── README.md
```

### Database Schema
```sql
CREATE TABLE todos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 0,
  due_date TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### Validation Rules
- title: required, 3-200 characters
- description: optional, max 1000 characters
- status: enum ['pending', 'completed']
- priority: integer 0-5

### Testing Requirements
- Unit tests for validation
- Integration tests for all endpoints
- Coverage > 80%
- Test both success and error cases

### Success Criteria
- [ ] All endpoints working
- [ ] Tests passing (>80% coverage)
- [ ] Error handling implemented
- [ ] CLAUDE.md documented
- [ ] README with setup instructions

### Important
- Follow API_CONTRACT.md strictly
- Use response format from SHARED_CONTEXT.md
- Document all decisions in CLAUDE.md
