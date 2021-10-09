const User = require('../dataBase/User');

exports.logIn = (req, res) => {
    res.json('authorized');
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (err) {
        res.json(err.message);
    }
};

exports.getUserById = (req, res) => {
    res.json(req.user);
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
