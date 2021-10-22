const authRouter = require('express').Router();

const {
    logIn,
    logOut,
    refreshToken,
    setActionToken,
    validateActionToken,
    resetPassword
} = require('../controllers');

const {
    validateRequestBody,
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    checkAccessToken,
    checkRefreshToken,
    validateActionTokenMW
} = require('../middlewares');

const { userEmailValidator, userPasswordValidator } = require('../validators/user.validator');

const { ADMIN, USER, MANAGER } = require('../configs/user-roles.enum');

authRouter.post(
    '/',
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed([ADMIN, USER, MANAGER]),
    isUserPasswordCorrect,
    logIn
);

authRouter.post('/refresh', checkRefreshToken, refreshToken);
authRouter.post('/logout', checkAccessToken, logOut);

authRouter.get('/password/validate-token', validateActionToken);
authRouter.post(
    '/password/forgot',
    validateRequestBody(userEmailValidator),
    isUserWithEmailPresent,
    setActionToken
);
authRouter.post('/password/reset', validateRequestBody(userPasswordValidator), validateActionTokenMW, resetPassword);

module.exports = authRouter;
