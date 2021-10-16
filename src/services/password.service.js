const bcrypt = require('bcrypt');
const Err = require('../errors/Err');
const { WRONG_EMAIL_OR_PASSWORD } = require('../configs/error-messages.enum');
const { BAD_REQUEST } = require('../configs/status-codes.enum');

exports.hash = password => bcrypt.hash(password, 10);

exports.compare = async (password, hashedPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
        throw new Err(WRONG_EMAIL_OR_PASSWORD, BAD_REQUEST);
    }
};
