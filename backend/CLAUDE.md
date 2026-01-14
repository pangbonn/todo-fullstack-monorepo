# CLAUDE.md - Backend Learning Log

## Project Overview
Express.js backend API for Todo application, part of the fullstack monorepo.

## Architecture Decisions

### Database: SQLite with better-sqlite3
- **Why**: Simple setup, no external services needed for development
- **Trade-off**: Synchronous API (simpler code but blocking I/O)
- **Production consideration**: Should migrate to PostgreSQL for scaling

### File Structure
```
src/
├── app.js          # Express configuration (middleware, routes)
├── server.js       # Entry point (starts server)
├── routes/         # Route definitions
├── controllers/    # Request handlers
├── models/         # Database operations
├── middleware/     # Custom middleware
└── utils/          # Utilities (database connection)
```

**Reasoning**: Separation of concerns - each layer has single responsibility:
- Routes: Define endpoints and apply middleware
- Controllers: Handle HTTP request/response
- Models: Handle database operations

### Validation: Joi
- Centralized schema definitions
- Custom error messages
- Request body and query parameter validation

### Error Handling
- Custom `AppError` class for application errors
- Global error handler middleware
- Consistent error response format per API contract

## Key Implementation Notes

### Database Schema
- Used TEXT for dates (SQLite limitation)
- UUID for primary key (generated in application layer)
- snake_case in DB, camelCase in API responses

### Response Format
All responses follow shared contract:
```json
{
  "success": true/false,
  "data": { ... } or "error": { ... }
}
```

### Pagination
- Default: page=1, limit=10
- Maximum limit: 100
- Returns meta object with totalPages

## Testing Strategy

### Test Database
- Separate SQLite file for tests
- Reset before each test
- Cleaned up after all tests

### Test Coverage
- Health check endpoint
- All CRUD operations
- Validation (success and failure)
- Error handling (404, invalid JSON)

### Unit Testing Goals
- [ ] **Model Layer**: Test all database operations in isolation
  - Test CRUD operations with mock data
  - Test edge cases (empty results, invalid IDs)
  - Test transaction handling
  - Test data transformation (snake_case ↔ camelCase)
- [ ] **Controller Layer**: Test business logic
  - Test request validation
  - Test response formatting
  - Test error scenarios
  - Test pagination logic
- [ ] **Middleware**: Test custom middleware
  - Test error handler with different error types
  - Test validation middleware
  - Test authentication middleware (when added)
  - Test CORS configuration
- [ ] **Utilities**: Test helper functions
  - Test database connection handling
  - Test utility functions
  - Test error formatting

### Integration Testing
- [ ] Test full request/response cycle
- [ ] Test database interactions end-to-end
- [ ] Test error propagation through layers
- [ ] Test pagination with real data

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/health | Health check |
| GET | /api/v1/todos | List todos with pagination |
| POST | /api/v1/todos | Create todo |
| GET | /api/v1/todos/:id | Get single todo |
| PUT | /api/v1/todos/:id | Update todo |
| DELETE | /api/v1/todos/:id | Delete todo |
| GET | /api-docs | Swagger UI (planned) |

## API Documentation

### Swagger/OpenAPI Integration
- [ ] **Setup Swagger UI**
  - Install `swagger-jsdoc` and `swagger-ui-express`
  - Configure OpenAPI 3.0 specification
  - Add route for `/api-docs` endpoint
  - Configure base URL and server information
  
- [ ] **Document All Endpoints**
  - Add JSDoc comments to route definitions
  - Document request/response schemas
  - Document error responses (400, 404, 500)
  - Add example requests/responses
  - Document query parameters (pagination)
  - Document path parameters
  
- [ ] **Swagger Configuration**
  ```javascript
  // Example structure needed:
  - Base URL configuration (localhost:5000 for dev)
  - Security schemes (for future JWT)
  - Common response schemas
  - Tag organization (Todos, Health)
  - Components (schemas, responses)
  ```

- [ ] **Benefits**
  - Interactive API documentation
  - Auto-generated client SDKs
  - Contract testing capabilities
  - Better developer experience
  - Frontend team can test APIs directly

## Lessons Learned

1. **better-sqlite3 is synchronous** - No async/await needed for DB operations
2. **Joi validation** - Use `.messages()` for custom error messages
3. **Express error handling** - Must have 4 parameters (err, req, res, next)
4. **Test isolation** - Important to reset DB state between tests

## Future Improvements

### Authentication & Authorization
- [ ] Add authentication (JWT)
- [ ] Add user_id foreign key to todos
- [ ] Role-based access control

### Infrastructure
- [ ] Add Winston for structured logging
- [ ] Add rate limiting
- [ ] Database migrations system
- [ ] API versioning strategy

### Testing & Documentation
- [ ] **Unit Tests**: Increase coverage to >85%
  - Model layer unit tests
  - Controller unit tests
  - Middleware unit tests
  - Utility function tests
- [ ] **Swagger/OpenAPI**: Complete API documentation
  - Setup Swagger UI
  - Document all endpoints
  - Add request/response examples
  - Add authentication documentation (when JWT is added)
- [ ] **API Contract Testing**: Ensure compliance with shared contract
  - Validate response format matches contract
  - Test error response structure

### Performance
- [ ] Add caching layer (Redis)
- [ ] Database query optimization
- [ ] Response compression

## Commands

```bash
# Development
npm run dev

# Production
npm start

# Testing
npm test
npm run test:watch
npm run test:coverage  # (to be added - shows coverage report)

# Documentation
npm run docs           # (to be added - generates Swagger docs)
```

## Dependencies to Add

### For Unit Testing
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "@types/jest": "^29.0.0",
    "jest-coverage-badges": "^1.1.0"
  }
}
```

### For Swagger
```json
{
  "dependencies": {
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  }
}
```

### Jest Configuration (jest.config.js)
```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```
