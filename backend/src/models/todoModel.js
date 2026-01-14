const { v4: uuidv4 } = require('uuid');
const { getDatabase } = require('../utils/database');

class TodoModel {
  static findAll(options = {}) {
    const db = getDatabase();
    const {
      page = 1,
      limit = 10,
      status = 'all',
      search = '',
      sortBy = 'created_at',
      order = 'desc'
    } = options;

    const offset = (page - 1) * limit;
    const params = [];
    let whereClause = '1=1';

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Map sortBy from camelCase to snake_case
    const sortColumnMap = {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      title: 'title',
      created_at: 'created_at',
      updated_at: 'updated_at'
    };
    const sortColumn = sortColumnMap[sortBy] || 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Get total count
    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM todos WHERE ${whereClause}`);
    const { total } = countStmt.get(...params);

    // Get paginated results
    const selectStmt = db.prepare(`
      SELECT * FROM todos
      WHERE ${whereClause}
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT ? OFFSET ?
    `);
    const todos = selectStmt.all(...params, limit, offset);

    return {
      todos: todos.map(this.formatTodo),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    const todo = stmt.get(id);
    return todo ? this.formatTodo(todo) : null;
  }

  static create(data) {
    const db = getDatabase();
    const id = uuidv4();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO todos (id, title, description, status, priority, due_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      data.title,
      data.description || null,
      data.status || 'pending',
      data.priority || 0,
      data.dueDate || null,
      now,
      now
    );

    return this.findById(id);
  }

  static update(id, data) {
    const db = getDatabase();
    const existing = this.findById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updates = [];
    const params = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }
    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }
    if (data.priority !== undefined) {
      updates.push('priority = ?');
      params.push(data.priority);
    }
    if (data.dueDate !== undefined) {
      updates.push('due_date = ?');
      params.push(data.dueDate);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push('updated_at = ?');
    params.push(now);
    params.push(id);

    const stmt = db.prepare(`
      UPDATE todos SET ${updates.join(', ')} WHERE id = ?
    `);
    stmt.run(...params);

    return this.findById(id);
  }

  static delete(id) {
    const db = getDatabase();
    const existing = this.findById(id);
    if (!existing) return false;

    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    stmt.run(id);
    return true;
  }

  static formatTodo(todo) {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      dueDate: todo.due_date,
      createdAt: todo.created_at,
      updatedAt: todo.updated_at
    };
  }
}

module.exports = TodoModel;
