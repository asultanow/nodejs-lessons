const { normalizeUser } = require('../utils/user.util');
const { generateTokenPair } = require('../services');
const OAuth = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');

exports.logIn = async (req, res, next) => {
    try {
        const normalizedUser = normalizeUser(req.user);
        const tokenPair = generateTokenPair();

        await OAuth.create({ ...tokenPair, user_id: normalizedUser._id });

        res.json({ user: normalizedUser, ...tokenPair });
    } catch (err) {
        next(err);
    }
};

exports.logOut = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        await OAuth.deleteOne({ token });

        res.json('logged out');
    } catch (err) {
        next(err);
    }
};
