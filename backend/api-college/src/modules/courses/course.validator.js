const Joi = require("joi");

const createCourseSchema = Joi.object({
  faculty: Joi.string().required(),

  name: Joi.string().required(),

  description: Joi.string().allow("", null),

  courseUrl: Joi.string(),

  duration: Joi.string().required(),
});

const updateCourseSchema = Joi.object({
  faculty: Joi.string(),

  name: Joi.string(),
  
  courseUrl: Joi.string(),

  description: Joi.string().allow("", null),

  duration: Joi.string(),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};