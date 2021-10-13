const userRouter = require('express').Router();

const {
    userController: {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser
    }
} = require('../controllers');

const {
    userMiddleware: {
        createReqBodyValidationMiddleware,
        validateUserEmail,
        validateUserId
    }
} = require('../middlewares');

const { userToCreateValidator, userToUpdateValidator } = require('../validators/user.validator');

const validateUserToCreate = createReqBodyValidationMiddleware({ validator: userToCreateValidator });

const validateUserToUpdate = createReqBodyValidationMiddleware({ validator: userToUpdateValidator });

userRouter.route('/')
    .get(getUsers)
    .post(validateUserToCreate, validateUserEmail, createUser);

userRouter.route('/:userId')
    .get(validateUserId, getUserById)
    .put(validateUserToUpdate, validateUserId, updateUser)
    .delete(validateUserId, deleteUser);

module.exports = userRouter;
