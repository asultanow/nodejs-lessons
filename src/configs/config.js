module.exports = {
    MONGODB_CONN_URI: process.env.MONGODB_CONN_URI || 'mongodb://localhost:27017/homework5_db',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'access-secret-word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh-secret-word',

    NO_REPLY_EMAIL_USER: process.env.NO_REPLY_EMAIL_USER,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD
};
