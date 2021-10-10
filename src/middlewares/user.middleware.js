const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const { userValidator, userNameValidator } = require('../validators/user.validator');

exports.validateUser = (req, res, next) => {
    try {
        const { error, value } = userValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        req.body = value;

        next();
    } catch (err) {
        res.json(err.message);
    }
};

exports.validateUserEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Error('email already exists');
        }

        next();
    } catch (err) {
        res.json(err.message);
    }
};

exports.validateUserName = (req, res, next) => {
    try {
        const { error, value } = userNameValidator.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        req.body = value;

        next();
    } catch (err) {
        res.json(err.message);
    }
};

exports.validateUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('password');

        if (!user) {
            throw new Error('wrong email or password');
        }

        const { password: hashedPassword } = user;
        await compare(password, hashedPassword);

        next();
    } catch (err) {
        res.json(err.message);
    }};

exports.validateUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('wrong ID');
        }

        req.user = user;
        next();
    } catch (err) {
        res.json(err.message);
    }
};
