const jwt = require('jsonwebtoken');

const Err = require('../errors/Err');
const { INVALID_TOKEN, WRONG_TOKEN_TYPE } = require('../configs/error-messages.enum');
const { UNATHORIZED_401, INTERNAL_SERVER_ERROR_500 } = require('../configs/status-codes.enum');
const { ACCESS, REFRESH } = require('../configs/tokenTypes.enum');
const { FORGOT_PASSWORD } = require('../configs/actionTokenTypes.enum');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_FORGOT_PASSWORD_SECRET } = require('../configs/config');

exports.generateTokenPair = () => {
    const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { access_token, refresh_token };
};

exports.generateActionToken = actionTokenType => {
    let secretWord;

    switch(actionTokenType) {
        case FORGOT_PASSWORD:
            secretWord = JWT_FORGOT_PASSWORD_SECRET;
            break;
        default:
            throw new Err(WRONG_TOKEN_TYPE, INTERNAL_SERVER_ERROR_500);
    }

    return jwt.sign({}, secretWord, { expiresIn: '15m' });
};

exports.verifyToken = async (token, tokenType) => {
    try {
        let secretWord;

        switch(tokenType) {
            case ACCESS:
                secretWord = JWT_ACCESS_SECRET;
                break;
            case REFRESH:
                secretWord = JWT_REFRESH_SECRET;
                break;
            case FORGOT_PASSWORD:
                secretWord = JWT_FORGOT_PASSWORD_SECRET;
                break;
            default:
                throw new Err(WRONG_TOKEN_TYPE, INTERNAL_SERVER_ERROR_500);
        }

        await jwt.verify(token, secretWord);
    } catch (err) {
        if (err.message !== WRONG_TOKEN_TYPE) {
            throw new Err(INVALID_TOKEN, UNATHORIZED_401);
        }
    }
};
