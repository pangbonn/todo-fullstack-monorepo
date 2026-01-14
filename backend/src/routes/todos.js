const express = require('express');
const todoController = require('../controllers/todoController');
const {
  todoCreateSchema,
  todoUpdateSchema,
  todoQuerySchema,
  validate,
  validateQuery
} = require('../middleware/validation');

const router = express.Router();

router.get('/', validateQuery(todoQuerySchema), todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', validate(todoCreateSchema), todoController.create);
router.put('/:id', validate(todoUpdateSchema), todoController.update);
router.delete('/:id', todoController.delete);

module.exports = router;
