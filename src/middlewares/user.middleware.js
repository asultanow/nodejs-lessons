const User = require('../dataBase/User');
const Err = require('../errors/Err');

exports.createReqBodyValidationMiddleware = ({ validator, errStatus, errMessage }) => (req, res, next) => {
    const { error, value } = validator.validate(req.body);

    if (error) {
        const message = errMessage || error.details[0].message;
        const status = errStatus || 400;

        next(new Err(message, status));
        return;
    }

    req.body = value;

    next();
};

exports.isEmailAvailable = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            next(new Err('email already exists', 400));
            return;
        }

        next();
    } catch (err) {

        next(err);
    }
};

exports.isUserWithIdPresent = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).lean();

        if (!user) {

            next(new Err('wrong ID', 400));
            return;
        }

        req.user = user;

        next();
    } catch (err) {

        next(err);
    }
};
