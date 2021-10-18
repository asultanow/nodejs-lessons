const userRouter = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers');

const {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent,
    checkAccessToken
} = require('../middlewares');

const { userToCreateValidator, userToUpdateValidator } = require('../validators/user.validator');

const validateUserToCreate = createReqBodyValidationMiddleware(userToCreateValidator);
const validateUserToUpdate = createReqBodyValidationMiddleware(userToUpdateValidator);

userRouter.route('/')
    .get(getUsers)
    .post(validateUserToCreate, isEmailAvailable, createUser);

userRouter.route('/:userId')
    .get(isUserWithIdPresent, getUserById)
    .put(validateUserToUpdate, isUserWithIdPresent, updateUser)
    .delete(isUserWithIdPresent, checkAccessToken, deleteUser);

module.exports = userRouter;
