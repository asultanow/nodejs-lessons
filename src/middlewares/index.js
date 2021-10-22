const {
    validateRequestBody,
    isEmailAvailable,
    isUserWithIdPresent
} = require('./user.middleware');

const {
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    checkAccessToken,
    checkRefreshToken,
    checkActionToken
} = require('./auth.middleware');

const {
    handleError,
    handleNonexistentRoute
} = require('./error.middleware');

module.exports = {
    validateRequestBody,
    isEmailAvailable,
    isUserWithIdPresent,
    validateUserToAuth,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    handleError,
    handleNonexistentRoute,
    checkAccessToken,
    checkRefreshToken,
    checkActionToken
};
