const mongooseModel = require('mongoose').model;
const userSchema = require('./user.model');

module.exports = {
    User: mongooseModel('user', userSchema)
};