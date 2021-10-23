const { Schema, model } = require('mongoose');

const { hashPassword } = require('../services');
const { normalizeUser } = require('../utils/user.util');
const { USER } = require('../configs/models.enum');
const userRoles = require('../configs/user-roles.enum');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        trim: true,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    __v: {
        type: Number,
        select: false
    }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

UserSchema.methods = {
    normalize() {
        return normalizeUser(this);
    }
};

UserSchema.statics = {
    async createUserWithHashedPassword(user) {
        const hashedPassword = await hashPassword(user.password);

        return this.create({ ...user, password: hashedPassword });
    },

    async findUserByIdAndUpdateHashedPassword(id, password) {
        const hashedPassword = await hashPassword(password);

        return this.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    }
};

UserSchema.virtual('full_name').get(function() {
    return this.last_name ? `${this.name} ${this.last_name}` : this.name;
});

module.exports = model(USER, UserSchema);
