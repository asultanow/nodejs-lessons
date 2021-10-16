const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const Err = require('../errors/Err');
const { ACCESS_DENIED, WRONG_EMAIL_OR_PASSWORD } = require('../configs/error-messages.enum');
const { BAD_REQUEST, FORBIDDEN } = require('../configs/status-codes.enum');
const { userToAuthValidator } = require('../validators/user.validator');

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

        await compare(password, hashedPassword);
        next();
    } catch (err) {
        next(err);
    }
};
