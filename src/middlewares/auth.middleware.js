const { User, OAuth } = require('../dataBase');
const { comparePassword } = require('../services');
const Err = require('../errors/Err');
const { ACCESS_DENIED, WRONG_EMAIL_OR_PASSWORD, INVALID_TOKEN } = require('../configs/error-messages.enum');
const { BAD_REQUEST, FORBIDDEN, UNATHORIZED } = require('../configs/status-codes.enum');
const { ACCESS, REFRESH } = require('../configs/tokenTypes.enum');
const { AUTHORIZATION } = require('../configs/constants');
const { userToAuthValidator } = require('../validators/user.validator');
const { verifyToken } = require('../services');

exports.validateUserToAuth = (req, res, next) => {
    const { error, value } = userToAuthValidator.validate(req.body);

    if (error) {
        return next(new Err(WRONG_EMAIL_OR_PASSWORD, BAD_REQUEST));
    }

    req.body = value;
    next();
};

exports.isUserWithEmailPresent = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User
            .findOne({ email })
            .select('+password')
            .lean();
            
        if (!user) {
            return next(new Err(WRONG_EMAIL_OR_PASSWORD, BAD_REQUEST));
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

exports.isUserRoleAllowed = (userRoles = []) => (req, res, next) => {
    const { role } = req.user;

    if (!userRoles.includes(role)) {
        return next(new Err(ACCESS_DENIED, FORBIDDEN));
    }

    next();
};

exports.isUserPasswordCorrect = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { password: hashedPassword } = req.user;

        await comparePassword(password, hashedPassword);
        next();
    } catch (err) {
        next(err);
    }
};

exports.checkAccessToken = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            next(new Err(INVALID_TOKEN, UNATHORIZED));
        }

        await verifyToken(token, ACCESS);

        const tokenResponse = await OAuth
            .findOne({ access_token: token })
            .populate('user_id')
            .lean();

        if (!tokenResponse) {
            next(new Err(INVALID_TOKEN, UNATHORIZED));
        }

        req.user = tokenResponse.user_id;
        next();
    } catch (err) {
        next(err);
    }
};

exports.checkRefreshToken = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            next(new Err(INVALID_TOKEN, UNATHORIZED));
        }

        await verifyToken(token, REFRESH);

        const tokenResponse = await OAuth
            .findOne({ refresh_token: token })
            .populate('user_id')
            .lean();

        if (!tokenResponse) {
            next(new Err(INVALID_TOKEN, UNATHORIZED));
        }

        await OAuth.deleteOne({ refresh_token: token });
        req.user = tokenResponse.user_id;
        next();
    } catch (err){
        next(err);
    }
};
