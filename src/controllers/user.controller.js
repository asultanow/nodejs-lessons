const { User, OAuth } = require('../dataBase');
const { hashPassword } = require('../services');
const { normalizeUser } = require('../utils/user.util');
const { CREATED_201, NO_CONTENT_204 } = require('../configs/status-codes.enum');

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
        const createdUser = await User.create({ ...req.body, password: hashedPassword });
        const normalizedUser = normalizeUser(createdUser);

        res
            .status(CREATED_201)
            .json(normalizedUser);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).lean();

        res
            .status(CREATED_201)
            .json(updatedUser);
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId).lean();
        await OAuth.deleteMany({ user_id: userId });

        res.sendStatus(NO_CONTENT_204);
    } catch (err) {
        next(err);
    }
};
