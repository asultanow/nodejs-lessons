const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('./user.controller');

const { logIn, logOut } = require('./auth.controller');

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    logIn,
    logOut
};
