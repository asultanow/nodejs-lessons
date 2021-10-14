const { normalizeUser } = require('../utils/user.util');

exports.logIn = (req, res) => {
    const normalizedUser = normalizeUser(req.user);

    res
        .status(200)
        .json(normalizedUser);
};

exports.logOut =(req, res) => {

    res
        .status(200)
        .json('logged out');
};
