const {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent
} = require('./user.middleware');

const {
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect
} = require('./auth.middleware');

const {
    handleError,
    handleNonexistentRoute
} = require('./error.middleware');

module.exports = {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent,
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordCorrect,
    handleError,
    handleNonexistentRoute
};
