const Err = require('../errors/Err');
const { PAGE_NOT_FOUND } = require('../configs/error-messages.enum');
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../configs/status-codes.enum');

// eslint-disable-next-line no-unused-vars
exports.handleError = (err, req, res, next) => {
    const { status, message } = err;

    res
        .status(status || INTERNAL_SERVER_ERROR)
        .json(message);
};

exports.handleNonexistentRoute = (req, res, next) => {
    next(new Err(PAGE_NOT_FOUND, NOT_FOUND));
};
