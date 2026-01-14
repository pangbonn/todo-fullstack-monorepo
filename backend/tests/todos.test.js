const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Set up test database before requiring app
const testDbPath = path.join(__dirname, '../data/test-todos.db');
process.env.DATABASE_PATH = testDbPath;
process.env.NODE_ENV = 'test';

const app = require('../src/app');
const { getDatabase, closeDatabase, resetDatabase } = require('../src/utils/database');

describe('Todo API', () => {
  let createdTodoId;

  beforeAll(() => {
    // Ensure test database directory exists
    const dataDir = path.dirname(testDbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  });

  beforeEach(() => {
    // Reset database before each test
    resetDatabase();
    // Clear all todos
    const db = getDatabase();
    db.exec('DELETE FROM todos');
  });

  afterAll(() => {
    closeDatabase();
    // Clean up test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    const walPath = testDbPath + '-wal';
    const shmPath = testDbPath + '-shm';
    if (fs.existsSync(walPath)) fs.unlinkSync(walPath);
    if (fs.existsSync(shmPath)) fs.unlinkSync(shmPath);
  });

  describe('GET /api/v1/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/v1/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.services.database).toBe('ok');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('POST /api/v1/todos', () => {
    it('should create a new todo with required fields', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Todo');
      expect(res.body.data.status).toBe('pending');
      expect(res.body.data.priority).toBe(0);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');

      createdTodoId = res.body.data.id;
    });

    it('should create a todo with all fields', async () => {
      const todoData = {
        title: 'Complete Todo',
        description: 'A detailed description',
        priority: 3,
        dueDate: '2025-12-31T23:59:59Z'
      };

      const res = await request(app)
        .post('/api/v1/todos')
        .send(todoData);

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe(todoData.title);
      expect(res.body.data.description).toBe(todoData.description);
      expect(res.body.data.priority).toBe(todoData.priority);
      expect(new Date(res.body.data.dueDate).getTime()).toBe(new Date(todoData.dueDate).getTime());
    });

    it('should fail with title too short', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'ab' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
      expect(res.body.error.details.title).toBeDefined();
    });

    it('should fail with title too long', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'a'.repeat(201) });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail without title', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ description: 'No title here' });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail with invalid priority', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo', priority: 10 });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail with description too long', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo', description: 'a'.repeat(1001) });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail with invalid dueDate format', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo', dueDate: 'invalid-date' });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/todos', () => {
    beforeEach(async () => {
      // Create test todos
      await request(app).post('/api/v1/todos').send({ title: 'First Todo', priority: 1 });
      await request(app).post('/api/v1/todos').send({ title: 'Second Todo', priority: 2 });
      await request(app).post('/api/v1/todos').send({ title: 'Third Todo', priority: 3 });
    });

    it('should return all todos with pagination', async () => {
      const res = await request(app).get('/api/v1/todos');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.todos).toHaveLength(3);
      expect(res.body.data.meta.page).toBe(1);
      expect(res.body.data.meta.limit).toBe(10);
      expect(res.body.data.meta.total).toBe(3);
      expect(res.body.data.meta.totalPages).toBe(1);
    });

    it('should paginate results', async () => {
      const res = await request(app)
        .get('/api/v1/todos')
        .query({ page: 1, limit: 2 });

      expect(res.status).toBe(200);
      expect(res.body.data.todos).toHaveLength(2);
      expect(res.body.data.meta.totalPages).toBe(2);
    });

    it('should filter by status', async () => {
      // Complete one todo
      const todosRes = await request(app).get('/api/v1/todos');
      const todoId = todosRes.body.data.todos[0].id;
      await request(app).put(`/api/v1/todos/${todoId}`).send({ status: 'completed' });

      const res = await request(app)
        .get('/api/v1/todos')
        .query({ status: 'pending' });

      expect(res.status).toBe(200);
      expect(res.body.data.todos).toHaveLength(2);
    });

    it('should search in title and description', async () => {
      const res = await request(app)
        .get('/api/v1/todos')
        .query({ search: 'First' });

      expect(res.status).toBe(200);
      expect(res.body.data.todos).toHaveLength(1);
      expect(res.body.data.todos[0].title).toBe('First Todo');
    });

    it('should sort by title ascending', async () => {
      const res = await request(app)
        .get('/api/v1/todos')
        .query({ sortBy: 'title', order: 'asc' });

      expect(res.status).toBe(200);
      expect(res.body.data.todos[0].title).toBe('First Todo');
    });

    it('should handle invalid query parameters gracefully', async () => {
      const res = await request(app)
        .get('/api/v1/todos')
        .query({ status: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/todos/:id', () => {
    let todoId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Test Todo' });
      todoId = res.body.data.id;
    });

    it('should return a single todo', async () => {
      const res = await request(app).get(`/api/v1/todos/${todoId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(todoId);
      expect(res.body.data.title).toBe('Test Todo');
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).get('/api/v1/todos/non-existent-id');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('PUT /api/v1/todos/:id', () => {
    let todoId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'Original Title', description: 'Original Description' });
      todoId = res.body.data.id;
    });

    it('should update todo title', async () => {
      const res = await request(app)
        .put(`/api/v1/todos/${todoId}`)
        .send({ title: 'Updated Title' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.description).toBe('Original Description');
    });

    it('should update todo status', async () => {
      const res = await request(app)
        .put(`/api/v1/todos/${todoId}`)
        .send({ status: 'completed' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('completed');
    });

    it('should update multiple fields', async () => {
      const res = await request(app)
        .put(`/api/v1/todos/${todoId}`)
        .send({
          title: 'New Title',
          description: 'New Description',
          priority: 5,
          status: 'completed'
        });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('New Title');
      expect(res.body.data.description).toBe('New Description');
      expect(res.body.data.priority).toBe(5);
      expect(res.body.data.status).toBe('completed');
    });

    it('should fail with invalid status', async () => {
      const res = await request(app)
        .put(`/api/v1/todos/${todoId}`)
        .send({ status: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail with empty body', async () => {
      const res = await request(app)
        .put(`/api/v1/todos/${todoId}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app)
        .put('/api/v1/todos/non-existent-id')
        .send({ title: 'Updated' });

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('DELETE /api/v1/todos/:id', () => {
    let todoId;

    beforeEach(async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .send({ title: 'To Delete' });
      todoId = res.body.data.id;
    });

    it('should delete a todo', async () => {
      const res = await request(app).delete(`/api/v1/todos/${todoId}`);

      expect(res.status).toBe(204);

      // Verify it's deleted
      const getRes = await request(app).get(`/api/v1/todos/${todoId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app).delete('/api/v1/todos/non-existent-id');

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/api/v1/unknown');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('should handle invalid JSON', async () => {
      const res = await request(app)
        .post('/api/v1/todos')
        .set('Content-Type', 'application/json')
        .send('{ invalid json }');

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
