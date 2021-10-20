const { User, OAuth } = require('../dataBase');
const { hashPassword, sendEmail } = require('../services');
const { normalizeUser } = require('../utils/user.util');
const { CREATED_201, NO_CONTENT_204 } = require('../configs/status-codes.enum');
const { CREATED_USER, UPDATED_USER, DELETED_USER } = require('../configs/email-actions.enum');

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
        const { password } = req.body;
        const hashedPassword = await hashPassword(password);

        const createdUser = await User.create({ ...req.body, password: hashedPassword });
        const normalizedUser = normalizeUser(createdUser);

        const { name, email } = normalizedUser;
        await sendEmail(email, CREATED_USER, { name });

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

        const { name, email } = updatedUser;
        await sendEmail(email, UPDATED_USER, { name });

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
        const deletedUser = await User.findByIdAndDelete(userId).lean();
        await OAuth.deleteMany({ user_id: userId });

        const { name, email } = deletedUser;
        await sendEmail(email, DELETED_USER, { name });

        res.sendStatus(NO_CONTENT_204);
    } catch (err) {
        next(err);
    }
};
