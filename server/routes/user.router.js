const router = require('express').Router();
const ApiResponse = require('../utils/ApiResponse');
const {
    validateUserRegistration,
    validateUserLogin,
    validateForgotPassword
} = require('../validators/user.validator');
const {
    registerUser,
    loginUser,
    forgotPassword
} = require('../controllers/user.controller');



/**
 * @route   POST /api/v1/users
 * @access  Public
 * @desc    Register user and return JWT token
 */
router.post(
    '/',
    validateUserRegistration,
    async (req, res, next) => {
        try {
            const data = {
                name: req.body.name,
                email: req.body.username || '',
                password: req.body.password
            };
            const token = await registerUser(data);

            return new ApiResponse(res, 201, 'User registered successfully', { token });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
);

/**
 * @route   GET api/v1/users/login
 * @access  Public
 * @desc    Login user and return JWT token
 */
router.post(
    '/login',
    validateUserLogin,
    async (req, res, next) => {
        try {
            const data = {
                email: req.body.username,
                password: req.body.password
            };
            const token = await loginUser(data);

            return new ApiResponse(res, 200, 'User logged in successfully', { token });
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @route   POST api/v1/users/forgot-password
 * @access  Public
 * @desc    Send OTP to reset password
 */
router.post(
    '/forgot-password',
    validateForgotPassword,
    async (req, res, next) => {
        try {
            const data = {
                email: req.body.username
            };
            const otpData = await forgotPassword(data);

            return new ApiResponse(res, 200, 'Verify OTP to reset password', { otp_hash: otpData.otpHash, username: otpData.email });
        } catch (err) {
            next(err);
        }
    }

);

module.exports = router;