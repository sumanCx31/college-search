const Joi = require("joi");

const createCollegeSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  faculty: Joi.string()
    .valid("Engineering", "IT", "Management", "Medical"),

  location: Joi.string().required(),

  university: Joi.string().required(),

  feeStructure: Joi.number(),

  activities: Joi.array().items(Joi.string()),

  description: Joi.string().allow("", null),

  image: Joi.string().allow("", null),
});

const updateCollegeSchema = Joi.object({
  name: Joi.string().min(3).max(100),

  faculty: Joi.string().valid(
    "Engineering",
    "IT",
    "Management",
    "Medical"
  ),

  location: Joi.string(),

  university: Joi.string(),

  feeStructure: Joi.number(),

  activities: Joi.array().items(Joi.string()),

  description: Joi.string().allow("", null),

  image: Joi.string().allow("", null),
});

module.exports = {
  createCollegeSchema,
  updateCollegeSchema,
};