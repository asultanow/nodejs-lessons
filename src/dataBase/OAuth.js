const { Schema, model } = require('mongoose');

const OAuth = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    __v: {
        type: Number,
        select: false
    }
}, { timestamps: true });

module.exports = model('OAuth', OAuth);
