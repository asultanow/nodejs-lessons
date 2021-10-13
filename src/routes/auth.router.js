const authRouter = require('express').Router();

const { userLoginValidator } = require('../validators/user.validator');

const {
    authMiddleware: { confirmUserLogin },
    userMiddleware: { createReqBodyValidationMiddleware }
} = require('../middlewares');

const { authController: { logIn } } = require('../controllers');

const validateUserLogin = createReqBodyValidationMiddleware({
    validator: userLoginValidator,
    errStatus: 401,
    errMessage: 'wrong email or password'
});

authRouter.post('/', validateUserLogin, confirmUserLogin, logIn);

module.exports = authRouter;
