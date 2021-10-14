const { Model } = require('mongoose');

exports.normalizeUser = (userDoc = {}) => {
    const user = userDoc instanceof Model ? userDoc.toObject() : userDoc;
    const fieldsToRemove = ['password', '__v'];

    fieldsToRemove.forEach(field => delete user[field]);

    return user;
};
