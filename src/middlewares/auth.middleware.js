const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const Err = require('../errors/Err');

exports.isUserWithEmailPresent = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User
            .findOne({ email })
            .select('+password')
            .lean();

        if (!user) {

            next(new Err('wrong email or password', 401));
            return;
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

        next(new Err('access denied', 403));
        return;
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
