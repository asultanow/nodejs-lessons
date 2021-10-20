const userRouter = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers');

const {
    validateRequestBody,
    isEmailAvailable,
    isUserWithIdPresent,
    checkAccessToken
} = require('../middlewares');

const { userToCreateValidator, userToUpdateValidator } = require('../validators/user.validator');

userRouter.route('/')
    .get(getUsers)
    .post(validateRequestBody(userToCreateValidator), isEmailAvailable, createUser);

userRouter.route('/:userId')
    .get(isUserWithIdPresent, getUserById)
    .put(validateRequestBody(userToUpdateValidator), isUserWithIdPresent, checkAccessToken, updateUser)
    .delete(isUserWithIdPresent, checkAccessToken, deleteUser);

module.exports = userRouter;
