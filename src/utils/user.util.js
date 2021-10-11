exports.normalizeUser = userDoc => {
    const user = userDoc.toObject();
    const fieldsToRemove = ['password', '__v'];

    fieldsToRemove.forEach(field => delete user[field]);

    return user;
};
