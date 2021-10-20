const {
    CREATED_USER,
    UPDATED_USER,
    DELETED_USER
} = require('../configs/email-actions.enum');

module.exports = {
    [CREATED_USER]: {
        templateName: 'createdUser',
        subject: 'Created account'
    },
    [UPDATED_USER]: {
        templateName: 'updatedUser',
        subject: 'Updated account'
    },
    [DELETED_USER]: {
        templateName: 'deletedUser',
        subject: 'Deleted account'
    }
};
