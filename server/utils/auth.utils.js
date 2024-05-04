const jwt = require('jsonwebtoken');

const generateJwtToken = data => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY_TIME },
            (err, token) => {
                if (err) {
                    console.error(`[authUtils][generateJwtToken][${data?.email}] Error: ${err}`);
                    return reject('Error geneting jwt token');
                }
                return resolve(token);
            }
        );
    });
};

module.exports = {
    generateJwtToken
};