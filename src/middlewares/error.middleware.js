const Err = require('../errors/Err');

// eslint-disable-next-line no-unused-vars
exports.handleError = (err, req, res, next) => {
    const { status, message } = err;

    res
        .status(status || 500)
        .json(message);
};

exports.handleNonexistentRoute = (req, res, next) => {

    next(new Err('page not found', 404));
};
