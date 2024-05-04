const ApiError = require("../utils/ApiError");
const { isEmpty } = require("../utils/validator");

const globalErrorHandler = (error, req, res, next) => {
    if (!(error instanceof ApiError)) {
        console.error(error);
    }

    const responseObject = {
        msg: error.msg || 'Something went wrong, Please try again later'
    };
    if (!isEmpty(error.errors)) {
        responseObject.err = error.errors;
    }

    return res.status(error.status || 500).json(responseObject);
};

module.exports = {
    globalErrorHandler
};