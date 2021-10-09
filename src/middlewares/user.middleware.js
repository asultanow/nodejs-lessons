const User = require('../dataBase/User');

exports.verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Error('email already exists');
        }

        next();
    } catch (err) {
        res.json(err.message);
    }
};

exports.verifyLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            throw new Error('wrong email or password');
        }

        next();
    } catch (err) {
        res.json(err.message);
    }};

exports.verifyUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('wrong ID');
        }

        req.user = user;
        next();
    } catch (err) {
        res.json(err.message);
    }
};
