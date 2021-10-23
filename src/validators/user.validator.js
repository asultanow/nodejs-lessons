const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

exports.userToCreateValidator = Joi.object({
    name: Joi
        .string()
        .required()
        .trim()
        .alphanum()
        .min(2)
        .max(30),
    last_name: Joi
        .string()
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
        .trim()
        .allow(...Object.values(userRoles))
});

exports.userToUpdateValidator = Joi.object({
    name: Joi
        .string()
        .required()
        .trim()
        .alphanum()
        .min(2)
        .max(30),
    last_name: Joi
        .string()
        .trim()
        .alphanum()
        .min(2)
        .max(30),
});

exports.userToAuthValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP),
    password: Joi
        .string()
        .required()
        .trim()
        .regex(PASSWORD_REGEXP)
});

exports.userEmailValidator = Joi.object({
    email: Joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP)
});

exports.userPasswordValidator = Joi.object({
    password: Joi
        .string()
        .required()
        .trim()
        .regex(PASSWORD_REGEXP)
});
