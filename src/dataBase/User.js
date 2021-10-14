const { Schema, model } = require('mongoose');

const userRoles = require('../configs/user-roles.enum');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
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
}, { timestamps: true });

module.exports = model('User', UserSchema);
