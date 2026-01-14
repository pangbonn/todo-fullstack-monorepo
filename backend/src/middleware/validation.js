const Joi = require('joi');

const todoCreateSchema = Joi.object({
  title: Joi.string().min(3).max(200).required()
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title must be at most 200 characters',
      'any.required': 'Title is required'
    }),
  description: Joi.string().max(1000).allow('', null)
    .messages({
      'string.max': 'Description must be at most 1000 characters'
    }),
  priority: Joi.number().integer().min(0).max(5).default(0)
    .messages({
      'number.min': 'Priority must be between 0 and 5',
      'number.max': 'Priority must be between 0 and 5'
    }),
  dueDate: Joi.string().isoDate().allow(null)
    .messages({
      'string.isoDate': 'Due date must be a valid ISO 8601 date'
    })
});

const todoUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(200)
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title must be at most 200 characters'
    }),
  description: Joi.string().max(1000).allow('', null)
    .messages({
      'string.max': 'Description must be at most 1000 characters'
    }),
  status: Joi.string().valid('pending', 'completed')
    .messages({
      'any.only': 'Status must be either pending or completed'
    }),
  priority: Joi.number().integer().min(0).max(5)
    .messages({
      'number.min': 'Priority must be between 0 and 5',
      'number.max': 'Priority must be between 0 and 5'
    }),
  dueDate: Joi.string().isoDate().allow(null)
    .messages({
      'string.isoDate': 'Due date must be a valid ISO 8601 date'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const todoQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid('pending', 'completed', 'all').default('all'),
  search: Joi.string().allow('').default(''),
  sortBy: Joi.string().valid('createdAt', 'updatedAt', 'title').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc')
});

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.reduce((acc, detail) => {
        acc[detail.path.join('.')] = detail.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details,
          timestamp: new Date().toISOString()
        }
      });
    }
    req.body = value;
    next();
  };
}

function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      const details = error.details.reduce((acc, detail) => {
        acc[detail.path.join('.')] = detail.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details,
          timestamp: new Date().toISOString()
        }
      });
    }
    req.query = value;
    next();
  };
}

module.exports = {
  todoCreateSchema,
  todoUpdateSchema,
  todoQuerySchema,
  validate,
  validateQuery
};
