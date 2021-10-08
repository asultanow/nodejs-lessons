const User = require('../dataBase/User');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (!user) {
            throw new Error('wrong email or password');
        }

        res.json('authorized');
    } catch (err) {
        res.json(err.message);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        res.json(err.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        res.json(user);
    } catch (err) {
        res.json(err.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json(user);
    } catch (err) {
        res.json(err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body);

        res.json(user);
    } catch (err) {
        res.json(err.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        res.json(user);
    } catch (err) {
        res.json(err.message);
    }
};
