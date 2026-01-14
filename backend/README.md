# Todo Backend API

Express.js API for the Todo application with SQLite database.

## Features

- RESTful API endpoints for Todo CRUD operations
- SQLite database with better-sqlite3
- Joi validation
- Error handling middleware
- CORS enabled
- Request logging with Morgan

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Running Tests

```bash
# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Health Check
- `GET /health` - Health check endpoint

### Todos
- `GET /todos` - List all todos (with pagination, filtering, sorting)
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a single todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

### Query Parameters (GET /todos)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page (max 100) |
| status | string | all | Filter by status: pending, completed, all |
| search | string | - | Search in title and description |
| sortBy | string | createdAt | Sort by: createdAt, updatedAt, title |
| order | string | desc | Sort order: asc, desc |

### Request/Response Format

**Create Todo (POST /todos)**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": 1,
  "dueDate": "2025-01-20T00:00:00Z"
}
```

**Response Format**
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

**Error Response**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {},
    "timestamp": "2025-01-14T10:00:00Z"
  }
}
```

## Validation Rules

- **title**: required, 3-200 characters
- **description**: optional, max 1000 characters
- **status**: enum ['pending', 'completed']
- **priority**: integer 0-5 (default: 0)
- **dueDate**: optional, valid ISO 8601 datetime

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Entry point
│   ├── routes/
│   │   └── todos.js        # Todo routes
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── todoModel.js    # Database operations
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js   # Joi schemas
│   └── utils/
│       └── database.js     # SQLite connection
├── tests/
│   └── todos.test.js       # Integration tests
├── data/                   # SQLite database files
├── .env.example
├── package.json
├── CLAUDE.md
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| DATABASE_PATH | SQLite database path | ./data/todos.db |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

## Error Codes

- `VALIDATION_ERROR` (400): Invalid input
- `NOT_FOUND` (404): Resource not found
- `INTERNAL_ERROR` (500): Server error
