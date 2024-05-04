class ApiError extends Error {
    constructor(status, msg, errors = {}) {
        super(msg);
        this.msg = msg;
        this.status = status;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;