const ApiError = require('../utils/ApiError');
const { generateJwtToken } = require('../utils/auth.utils');
const { User } = require('../models');

const registerUser = async ({ name, email, password }) => {
    let user = await User.findUserByEmailOrPhone(email);
    if (user) {
        throw new ApiError(409, 'User already exists', { username: 'user is already registered' });
    } else {
        user = await User.addUser({ name, email, password });
    }

    const token = await generateJwtToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    return token;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findUserByEmailOrPhone(email);
    if (!user || !user.authenticate(password)) throw new ApiError(404, 'Invalid credentials', { username: 'Username or password is invalid', password: 'Username or password is invalid' });

    const token = await generateJwtToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    return token
};

const forgotPassword = async ({ email }) => {
    const user = await User.findUserByEmailOrPhone(email);
    if (!user) throw new ApiError(404, 'User not found', { 'username': 'User not found' });

    return {
        email,
        otpHash: '123qwerty'
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword
};