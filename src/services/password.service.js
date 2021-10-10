const bcrypt = require('bcrypt');

exports.hash = password => bcrypt.hash(password, 10);

exports.compare = async (password, hashedPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
        throw new Error('wrong email or password');
    }
};
