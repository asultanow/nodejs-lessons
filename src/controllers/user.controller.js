const User = require('../dataBase');
const OAuth = require('../dataBase');
const { hashPassword } = require('../services');
const { normalizeUser } = require('../utils/user.util');
const { CREATED } = require('../configs/status-codes.enum');

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
        const hashedPassword = await hashPassword(req.body.password);
        const user = await User.create({ ...req.body, password: hashedPassword });
        const normalizedUser = normalizeUser(user);

        res
            .status(CREATED)
            .json(normalizedUser);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true }).lean();

        res
            .status(CREATED)
            .json(user);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        await OAuth.deleteOne({ user_id: userId });
        const normalizedUser = normalizeUser(user);

        res.json(normalizedUser);
    } catch (err) {
        next(err);
    }
};
