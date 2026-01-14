const TodoModel = require('../models/todoModel');
const { AppError } = require('../middleware/errorHandler');

const todoController = {
  getAll: (req, res, next) => {
    try {
      const result = TodoModel.findAll(req.query);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  getById: (req, res, next) => {
    try {
      const todo = TodoModel.findById(req.params.id);
      if (!todo) {
        throw new AppError('NOT_FOUND', 'Todo not found', 404);
      }
      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  },

  create: (req, res, next) => {
    try {
      const todo = TodoModel.create(req.body);
      res.status(201).json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  },

  update: (req, res, next) => {
    try {
      const todo = TodoModel.update(req.params.id, req.body);
      if (!todo) {
        throw new AppError('NOT_FOUND', 'Todo not found', 404);
      }
      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  },

  delete: (req, res, next) => {
    try {
      const deleted = TodoModel.delete(req.params.id);
      if (!deleted) {
        throw new AppError('NOT_FOUND', 'Todo not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = todoController;
