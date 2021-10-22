const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('./user.controller');

const {
    logIn,
    logOut,
    refreshToken,
    setActionToken,
    validateActionToken,
    resetPassword
} = require('./auth.controller');

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    logIn,
    logOut,
    refreshToken,
    setActionToken,
    validateActionToken,
    resetPassword
};
