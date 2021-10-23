const { generateTokenPair, generateActionToken, verifyToken, sendEmail } = require('../services');
const { OAuth, ActionToken, User} = require('../dataBase');
const { AUTHORIZATION } = require('../configs/constants');
const { NO_CONTENT_204, CREATED_201} = require('../configs/status-codes.enum');
const actionTokenTypes = require('../configs/actionTokenTypes.enum');
const emailActions = require('../configs/email-actions.enum');
const { RESET_PASSWORD } = require('../configs/email-actions.enum');

exports.logIn = async (req, res, next) => {
    try {
        const normalizedUser = req.user.normalize();
        const tokenPair = generateTokenPair();
        await OAuth.create({ ...tokenPair, user_id: normalizedUser.id });

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
        const normalizedUser = req.user.normalize();
        const tokenPair = generateTokenPair();

        await OAuth.deleteOne({ refresh_token: token });
        await OAuth.create({ ...tokenPair, user_id: normalizedUser.id });

        res.json({ user: normalizedUser, ...tokenPair });
    } catch (err) {
        next(err);
    }
};

exports.setActionToken = async (req, res, next) => {
    try {
        const { id, name, email } = req.user;
        const action_token = generateActionToken(actionTokenTypes.FORGOT_PASSWORD);

        await ActionToken.create({
            action_token,
            token_type: actionTokenTypes.FORGOT_PASSWORD,
            user_id: id
        });

        await sendEmail(email, emailActions.FORGOT_PASSWORD, { name, action_token });

        res.sendStatus(NO_CONTENT_204);
    } catch (err) {
        next(err);
    }
};

exports.validateActionToken = async (req, res, next) => {
    try {
        const { action_token } = req.query;
        await verifyToken(action_token, actionTokenTypes.FORGOT_PASSWORD);

        res.sendStatus(NO_CONTENT_204);
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);
        const { password } = req.body;
        const { id, name, email } = req.user;
        const tokenPair = generateTokenPair();

        const updatedUser = await User.findUserByIdAndUpdateHashedPassword(id, password);
        await ActionToken.deleteOne({ action_token: token });
        await OAuth.deleteMany({ user_id: id });
        await OAuth.create({ ...tokenPair, user_id: id });
        await sendEmail(email, RESET_PASSWORD, { name });

        res
            .status(CREATED_201)
            .json({ user: updatedUser, ...tokenPair });
    } catch (err) {
        next(err);
    }
};
