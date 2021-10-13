const bcrypt = require('bcrypt');
const Err = require('../errors/Err');

exports.hash = password => bcrypt.hash(password, 10);

exports.compare = async (password, hashedPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
        throw new Err(401, 'wrong email or password');
    }
};
