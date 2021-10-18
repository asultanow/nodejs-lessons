const { User } = require('../dataBase');
const Err = require('../errors/Err');
const { EMAIL_ALREADY_EXISTS, WRONG_ID } = require('../configs/error-messages.enum');
const { BAD_REQUEST } = require('../configs/status-codes.enum');

exports.createReqBodyValidationMiddleware = validator => (req, res, next) => {
    const { error, value } = validator.validate(req.body);

    if (error) {        
        return next(new Err(error.details[0].message, BAD_REQUEST));
    }

    req.body = value;
    next();
};

exports.isEmailAvailable = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return next(new Err(EMAIL_ALREADY_EXISTS, BAD_REQUEST));
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
            return next(new Err(WRONG_ID, BAD_REQUEST));
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
