const { Schema, model } = require('mongoose');

const { ACTION_TOKEN, USER } = require('../configs/models.enum');
const actionTokenTypes = require('../configs/actionTokenTypes.enum');

const ActionToken = new Schema({
    action_token: {
        type: String,
        required: true,
        trim: true
    },
    token_type: {
        type: String,
        required: true,
        trim: true,
        enum: Object.values(actionTokenTypes)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
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

module.exports = model(ACTION_TOKEN, ActionToken);
