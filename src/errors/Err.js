module.exports = class Err extends Error {
    constructor(status, message) {
        super(message);

        this.status = status;
    }
};
