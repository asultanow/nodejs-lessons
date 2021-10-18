const {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent
} = require('./user.middleware');

const {
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    checkAccessToken,
    checkRefreshToken
} = require('./auth.middleware');

const {
    handleError,
    handleNonexistentRoute
} = require('./error.middleware');

module.exports = {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent,
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    handleError,
    handleNonexistentRoute,
    checkAccessToken,
    checkRefreshToken
};
