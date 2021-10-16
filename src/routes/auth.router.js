const authRouter = require('express').Router();

const { logIn, logOut } = require('../controllers');

const {
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect
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

authRouter.post('/logout', logOut);

module.exports = authRouter;
