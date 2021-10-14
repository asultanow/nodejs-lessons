const authRouter = require('express').Router();

const { logIn, logOut } = require('../controllers');

const {
    createReqBodyValidationMiddleware,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordValid
} = require('../middlewares');

const { userLoginValidator } = require('../validators/user.validator');
const { ADMIN, MANAGER } = require('../configs/user-roles.enum');

const validateUserToLogin = createReqBodyValidationMiddleware({
    validator: userLoginValidator,
    errStatus: 401,
    errMessage: 'wrong email or password'
});

authRouter.post(
    '/',
    validateUserToLogin,
    isUserWithEmailPresent,
    isUserRoleAllowed([ADMIN, MANAGER]),
    isUserPasswordValid,
    logIn
);

authRouter.post('/logout', logOut);

module.exports = authRouter;
