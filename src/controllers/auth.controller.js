const { normalizeUser } = require('../utils/user.util');
const { generateTokenPair } = require('../services');
const { OAuth } = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');
const { NO_CONTENT_204 } = require('../configs/status-codes.enum');

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
        await OAuth.deleteOne({ access_token: token });

        res.sendStatus(NO_CONTENT_204);
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);
        const normalizedUser = normalizeUser(req.user);
        const tokenPair = generateTokenPair();

        await OAuth.deleteOne({ refresh_token: token });
        await OAuth.create({ ...tokenPair, user_id: normalizedUser._id });

        res.json({ user: normalizedUser, ...tokenPair });
    } catch (err) {
        next(err);
    }
};
