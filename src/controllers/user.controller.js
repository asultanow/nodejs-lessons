const User = require('../dataBase/User');
const { hash } = require('../services/password.service');
const { normalizeUser } = require('../utils/user.util');

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
        const hashedPassword = await hash(req.body.password);
        const user = await User.create({ ...req.body, password: hashedPassword });
        const normalizedUser = normalizeUser(user);

        res.json(normalizedUser);
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
        const normalizedUser = normalizeUser(user);

        res.json(normalizedUser);
    } catch (err) {
        res.json(err.message);
    }
};
