const authRouter = require('express').Router();

const { logIn, logOut } = require('../controllers');

const {
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    checkAccessToken,
    checkRefreshToken
} = require('../middlewares');

const { ADMIN, MANAGER } = require('../configs/user-roles.enum');

authRouter.post(
    '/',
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed([ADMIN, MANAGER]),
    isUserPasswordCorrect,
    logIn
);

authRouter.post('/refresh', checkRefreshToken, logIn);
authRouter.post('/logout', checkAccessToken, logOut);

module.exports = authRouter;
