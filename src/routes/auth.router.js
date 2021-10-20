const authRouter = require('express').Router();

const { logIn, logOut, refreshToken } = require('../controllers');

const {
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    checkAccessToken,
    checkRefreshToken
} = require('../middlewares');

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

module.exports = authRouter;
