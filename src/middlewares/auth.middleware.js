const User = require('../dataBase/User');
const { compare } = require('../services/password.service');
const Err = require('../errors/Err');

exports.confirmUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            next(new Err(401, 'wrong email or password'));

            return;
        }

        const { password: hashedPassword } = user;
        await compare(password, hashedPassword);

        req.user = user;

        next();
    } catch (err) {

        next(new Err(500, err.message));
    }};
