import axios from 'axios';

const userLogin = async ({ username, password }) => {
    try {
        const res = await axios.post('/api/v1/users/login', { username, password });
        return res.data;
    } catch (err) {
        return null;
    }
};

const userRegister = async ({ name, username, password }) => {
    try {
        const res = await axios.post('/api/v1/users/', { name, username, password });
        return res.data;
    } catch (err) {
        return null;
    }
};

const forgotPassword = async ({ username }) => {
    try {
        const res = await axios.post('/api/v1/users/forgot-password', { username });
        return res.data;
    } catch (err) {
        return null;
    }
};

const resetPassword = async ({ username, password, otp, otpHash }) => {
    try {
        const res = await axios.post('/api/v1/users/reset-password', { username, password, otp, otp_hash: otpHash });
        return res.data;
    } catch (err) {
        return null;
    }
}

export {
    userLogin,
    userRegister,
    forgotPassword,
    resetPassword
};