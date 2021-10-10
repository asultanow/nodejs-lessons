exports.normalizeUser = user => {
    const fieldsToRemove = ['password', '__v'];

    fieldsToRemove.forEach(field => delete user[field]);

    return user;
};
