const jwt = require('jsonwebtoken');

const Err = require('../errors/Err');
const { INVALID_TOKEN } = require('../configs/error-messages.enum');
const { UNATHORIZED } = require('../configs/status-codes.enum');
const { ACCESS } = require('../configs/tokenTypes.enum');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');

exports.generateTokenPair = () => {
    const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { access_token, refresh_token };
};

exports.verifyToken = async (token, tokenType) => {
    try {
        const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

        await jwt.verify(token, secret);
    } catch (err) {
        throw new Err(INVALID_TOKEN, UNATHORIZED);
    }
};
