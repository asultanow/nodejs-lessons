const { normalizeUser } = require('../utils/user.util');

exports.logIn = (req, res) => {
    const normalizedUser = normalizeUser(req.user);

    res.json(normalizedUser);
};
