const User = require('../dataBase/User');

exports.createUserMiddleware = async (req, res, next) => {
    try {
        const userWithEmail = await User.findOne({ email: req.body.email });

        if (userWithEmail) {
            throw new Error('email already exists');
        }

        next();
    } catch (err) {
        res.json(err.message);
    }
};
