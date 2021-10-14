const {
    createReqBodyValidationMiddleware,
    isEmailAvailable,
    isUserWithIdPresent
} = require('./user.middleware');

const {
    isUserWithEmailPresent,
    isUserRoleAllowed,
    isUserPasswordValid
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
    isUserPasswordValid,
    handleError,
    handleNonexistentRoute
};
