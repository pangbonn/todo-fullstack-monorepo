# Task: Add Unit Tests and Swagger Documentation

## Objective
เพิ่ม Unit Tests และ Swagger API Documentation ตามที่ระบุใน CLAUDE.md เพื่อเพิ่มคุณภาพโค้ดและเอกสาร API

## Phase 1: Unit Tests

### 1.1 Model Layer Unit Tests
สร้างไฟล์ `tests/models/todoModel.test.js`
- [ ] Test `findAll()` - ทดสอบการดึงข้อมูลทั้งหมด
  - Test with pagination (page, limit)
  - Test with empty database
  - Test with large dataset
- [ ] Test `findById()` - ทดสอบการดึงข้อมูลตาม ID
  - Test with valid ID
  - Test with invalid ID (should return null)
  - Test with non-existent ID
- [ ] Test `create()` - ทดสอบการสร้าง todo ใหม่
  - Test with valid data
  - Test with missing required fields
  - Test data transformation (camelCase to snake_case)
- [ ] Test `update()` - ทดสอบการอัปเดต todo
  - Test with valid data
  - Test with invalid ID
  - Test partial update
- [ ] Test `delete()` - ทดสอบการลบ todo
  - Test with valid ID
  - Test with invalid ID
  - Test soft delete (if implemented)

### 1.2 Controller Layer Unit Tests
สร้างไฟล์ `tests/controllers/todoController.test.js`
- [ ] Test `getAllTodos()` - ทดสอบ business logic
  - Test request validation
  - Test response formatting
  - Test pagination logic
  - Test error handling
- [ ] Test `getTodoById()` - ทดสอบการดึง todo เดียว
  - Test success case
  - Test 404 error case
- [ ] Test `createTodo()` - ทดสอบการสร้าง todo
  - Test validation
  - Test response format
  - Test error scenarios
- [ ] Test `updateTodo()` - ทดสอบการอัปเดต
  - Test success case
  - Test 404 error
  - Test validation errors
- [ ] Test `deleteTodo()` - ทดสอบการลบ
  - Test success case
  - Test 404 error

### 1.3 Middleware Unit Tests
สร้างไฟล์ `tests/middleware/errorHandler.test.js`
- [ ] Test error handler with different error types
  - Test AppError
  - Test ValidationError (Joi)
  - Test generic Error
  - Test 404 errors
  - Test 500 errors
- [ ] Test error response format
  - Verify response structure matches API contract
  - Verify error message format

สร้างไฟล์ `tests/middleware/validation.test.js`
- [ ] Test validation middleware
  - Test valid request
  - Test invalid request (missing fields)
  - Test invalid data types
  - Test custom error messages

### 1.4 Utilities Unit Tests
สร้างไฟล์ `tests/utils/database.test.js`
- [ ] Test database connection
- [ ] Test database initialization
- [ ] Test error handling

### 1.5 Jest Configuration
อัปเดต `package.json` หรือสร้าง `jest.config.js`:
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

### 1.6 Update package.json Scripts
เพิ่ม scripts:
```json
{
  "scripts": {
    "test:coverage": "jest --coverage --coverageReporters=text --coverageReporters=html"
  }
}
```

## Phase 2: Swagger Documentation

### 2.1 Install Dependencies
```bash
npm install swagger-jsdoc swagger-ui-express
```

### 2.2 Create Swagger Configuration
สร้างไฟล์ `src/config/swagger.js`:
- [ ] Configure OpenAPI 3.0 specification
- [ ] Set base URL (localhost:5000 for dev)
- [ ] Define server information
- [ ] Configure security schemes (for future JWT)
- [ ] Define common response schemas
- [ ] Organize tags (Todos, Health)

### 2.3 Document Routes
อัปเดต `src/routes/todos.js`:
- [ ] เพิ่ม JSDoc comments สำหรับทุก endpoint
- [ ] Document request schemas
- [ ] Document response schemas
- [ ] Document error responses (400, 404, 500)
- [ ] Add example requests/responses
- [ ] Document query parameters (pagination: page, limit)
- [ ] Document path parameters (id)

อัปเดต health route (ถ้ามี):
- [ ] Document health check endpoint

### 2.4 Setup Swagger UI Route
อัปเดต `src/app.js`:
- [ ] Import swagger configuration
- [ ] Add route `/api-docs` สำหรับ Swagger UI
- [ ] Configure Swagger UI options

### 2.5 Example JSDoc Format
```javascript
/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 */
```

## Phase 3: Testing & Verification

### 3.1 Run Tests
- [ ] Run all unit tests: `npm test`
- [ ] Check coverage: `npm run test:coverage`
- [ ] Verify coverage > 80% for all metrics
- [ ] Fix any failing tests

### 3.2 Verify Swagger
- [ ] Start server: `npm run dev`
- [ ] Visit http://localhost:5000/api-docs
- [ ] Verify all endpoints are documented
- [ ] Test "Try it out" feature for each endpoint
- [ ] Verify request/response examples work

### 3.3 Update CLAUDE.md
- [ ] Mark completed tasks in CLAUDE.md
- [ ] Document any learnings or issues encountered
- [ ] Update "Lessons Learned" section

## Success Criteria
- [ ] All unit tests passing
- [ ] Test coverage > 80% (branches, functions, lines, statements)
- [ ] Swagger UI accessible at /api-docs
- [ ] All endpoints documented with examples
- [ ] Request/response schemas defined
- [ ] Error responses documented

## Important Notes
- Follow existing code style and patterns
- Use the same response format as defined in API_CONTRACT.md
- Ensure tests are isolated (reset database between tests)
- Swagger documentation should match actual API behavior
- Update README.md with Swagger documentation instructions

## References
- CLAUDE.md - สำหรับรายละเอียดเพิ่มเติม
- ../shared/API_CONTRACT.md - สำหรับ API specifications
- ../shared/SHARED_CONTEXT.md - สำหรับ project context
