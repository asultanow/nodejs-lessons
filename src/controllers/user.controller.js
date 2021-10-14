const User = require('../dataBase/User');
const { hash } = require('../services/password.service');
const { normalizeUser } = require('../utils/user.util');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().lean();

        res.json(users);
    } catch (err) {

        next(err);
    }
};

exports.getUserById = (req, res) => {

    res.json(req.user);
};

exports.createUser = async (req, res, next) => {
    try {
        const hashedPassword = await hash(req.body.password);
        const user = await User.create({ ...req.body, password: hashedPassword });
        const normalizedUser = normalizeUser(user);

        res.json(normalizedUser);
    } catch (err) {

        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body).lean();

        res.json(user);
    } catch (err) {

        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        const normalizedUser = normalizeUser(user);

        res.json(normalizedUser);
    } catch (err) {

        next(err);
    }
};
