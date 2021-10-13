const Err = require('../errors/Err');

// eslint-disable-next-line no-unused-vars
exports.handleError = (err, req, res, next) => {
    const { status, message } = err;

    res
        .status(status)
        .json(message);
};

exports.handleNonexistentRoute = (req, res, next) => {

    next(new Err(404, 'page not found'));
};
