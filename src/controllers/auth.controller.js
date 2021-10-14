const { normalizeUser } = require('../utils/user.util');

exports.logIn = (req, res) => {
    const normalizedUser = normalizeUser(req.user);

    res.json(normalizedUser);
};

exports.logOut =(req, res) => {

    res.json('logged out');
};
