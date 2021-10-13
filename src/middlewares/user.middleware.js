const User = require('../dataBase/User');
const Err = require('../errors/Err');

exports.createReqBodyValidationMiddleware = ({ validator, errStatus, errMessage }) => (req, res, next) => {
    const { error, value } = validator.validate(req.body);

    if (error) {
        const message = errMessage || error.details[0].message;
        const status = errStatus || 400;

        next(new Err(status, message));

        return;
    }

    req.body = value;

    next();
};

exports.validateUserEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            next(new Err(400, 'email already exists'));

            return;
        }

        next();
    } catch (err) {

        next(new Err(500, err.message));
    }
};

exports.validateUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).lean();

        if (!user) {
            next(new Err(400, 'wrong ID'));

            return;
        }

        req.user = user;

        next();
    } catch (err) {

        next(new Err(500, err.message));
    }
};
