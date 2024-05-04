const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { NAME_REGEX, EMAIL_REGEX, MOBILE_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        minlength: [3, 'Name cannot be less than 3 characters'],
        maxlength: [255, 'Name cannot be more than 255 characters'],
        match: [NAME_REGEX, 'Please provide a valid name']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email is required'],
        unique: [true, 'Email already registered'],
        minlength: [3, 'Email cannot be less than 3 characters'],
        maxlength: [255, 'Email cannot be more than 255 characters'],
        match: [EMAIL_REGEX, 'Please provide a valid email']
    },
    // phone_number: {
    //     type: String,
    //     trim: true,
    //     unique: [true, 'Phone number already registered'],
    //     match: [MOBILE_REGEX, 'Please provide a valid phone number'],
    //     required: [function () { return this.email === '' }, 'Email or Phone number is required']
    // },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    hashed_password: {
        type: String,
        required: [true, 'Password is required']
    },
    salt: {
        type: String,
        default: uuidv4()
    }
}, { timestamps: true });

// Virtuals
userSchema.virtual('password')
    .set(function (plainPassword) {
        this.hashed_password = this.hashPassword(plainPassword);
    });

// Methods  (DO NOT USE ARROW FUNCTIONS TO CREATE MONGOOSE METHODS)
userSchema.methods.hashPassword = function (plainPassword) {
    if (!plainPassword) return '';
    try {
        return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
    } catch (err) {
        throw new mongoose.Error(`[UserModel][hashPassword]: ${err}`);
    }
};

userSchema.methods.authenticate = function (plainPassword) {
    const hashedPassword = this.hashPassword(plainPassword);
    if (hashedPassword) return crypto.timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(this.hashed_password));
    return false
};

// Statics
userSchema.statics.findUserByEmailOrPhone = async function (param) {
    return await this.findOne({ $or: [{ email: param }, { phone_number: param }] });
};

userSchema.statics.addUser = async function (data) {
    return await this.create(data);
}

module.exports = userSchema;