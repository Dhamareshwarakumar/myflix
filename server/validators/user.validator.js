const { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } = require('../utils/constants');
const { isEmpty } = require('../utils/validator');
const ApiError = require('../utils/ApiError');

const validateUserRegistration = (req, res, next) => {
    let errors = {};

    try {
        // Name Validation
        if (isEmpty(req.body.name)) {
            errors.name = 'Name is required';
        } else if (typeof req.body.name !== 'string') {
            errors.name = 'Please provide a valid name';
        } else {
            req.body.name = req.body.name.trim();
            if (!NAME_REGEX.test(req.body.name)) {
                errors.name = 'Please provide valid name';
            } else if (req.body.name.length < 3 || req.body.name.length > 255) {
                errors.name = 'Name cannot be less than 3 characters and more than 255 characters';
            }
        }

        // username Validation
        if (isEmpty(req.body.username)) {
            errors.username = 'Username is required';
        } else if (typeof req.body.username !== 'string') {
            errors.username = 'Please provide a valid username';
        } else {
            req.body.username = req.body.username.trim().toLowerCase();
            if (!EMAIL_REGEX.test(req.body.username)) {
                errors.username = 'Please provide a valid email';
            } else if (req.body.username.length < 3 || req.body.username.lenghth > 255) {
                errors.username = 'Username cannot be less than 3 characters and more than 255 characters';
            }
        }

        // Password Validation
        if (isEmpty(req.body.password)) {
            errors.password = 'Password is required';
        } else if (typeof req.body.password !== 'string') {
            errors.password = 'Please provide a valid password';
        } else {
            req.body.password = req.body.password.trim();
            if (!PASSWORD_REGEX.test(req.body.password)) {
                errors.password = 'Password must contain atleast two uppercase letters, two lowercase letters, two numbers and two special characters';
            }
        }

        // send errors if any
        if (!isEmpty(errors)) {
            throw new ApiError(422, 'Validation error', errors);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const validateUserLogin = (req, res, next) => {
    let errors = {};

    try {
        // username validation
        if (isEmpty(req.body.username)) {
            errors.username = 'Username is required';
        } else if (typeof req.body.username !== 'string') {
            errors.username = 'Please provide a valid username';
        } else {
            req.body.username = req.body.username.trim().toLowerCase();
            if (!EMAIL_REGEX.test(req.body.username)) {
                errors.username = 'Please provide a valid email';
            }
        }

        // password validation
        if (isEmpty(req.body.password)) {
            errors.password = 'Password is required';
        } else if (typeof req.body.password !== 'string') {
            errors.password = 'Please provide a valid password';
        }

        // Check if there are any errors
        if (!isEmpty(errors)) {
            throw new ApiError(422, 'Validation error', errors);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const validateForgotPassword = (req, res, next) => {
    let errors = {};

    try {
        // username validation
        if (isEmpty(req.body.username)) {
            errors.username = 'Username is required';
        } else if (typeof req.body.username !== 'string') {
            errors.username = 'Please provide a valid username';
        } else {
            req.body.username = req.body.username.trim().toLowerCase();
            if (!EMAIL_REGEX.test(req.body.username)) {
                errors.username = 'Please provide a valid email';
            }
        }

        // Check if there are any errors
        if (!isEmpty(errors)) {
            throw new ApiError(422, 'Validation error', errors);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateForgotPassword
}