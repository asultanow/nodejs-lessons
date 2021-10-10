const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

exports.userValidator = Joi.object({
    name: Joi
        .string()
        .required()
        .trim()
        .alphanum()
        .min(2)
        .max(30),
    email: Joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP),
    password: Joi
        .string()
        .required()
        .trim()
        .regex(PASSWORD_REGEXP),
    role: Joi
        .string()
        .required()
        .trim()
        .allow(...Object.values(userRoles))
});

exports.userNameValidator = Joi.object({
    name: Joi
        .string()
        .required()
        .trim()
        .alphanum()
        .min(2)
        .max(30)
});
