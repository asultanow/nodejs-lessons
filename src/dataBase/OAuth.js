const { Schema, model } = require('mongoose');

const { O_AUTH, USER } = require('../configs/models.enum');

const OAuthSchema = new Schema({
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

OAuthSchema.pre('findOne', function() {
    this.populate('user_id');
});

module.exports = model(O_AUTH, OAuthSchema);
