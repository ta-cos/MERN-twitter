const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(req, res, next) {
    const err = {}
    err.errors = []
    const data = {}

    const {handle, email, password, password2} = req.body

    data.handle = validText(handle) ? handle : '';
    data.email = validText(email) ? email : '';
    data.password = validText(password) ? password : '';
    data.password2 = validText(password2) ? password2 : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        err.errors.push('Handle must be between 2 and 30 characters')
    }

    if (Validator.isEmpty(data.handle)) {
        err.errors.push('Handle field is required')
    }

    if (Validator.isEmpty(data.email)) {
        err.errors.push('Email field is required')
    }

    if (!Validator.isEmail(data.email)) {
        err.errors.push('Email is invalid')
    }

    if (Validator.isEmpty(data.password)) {
        err.errors.push('Password field is required')
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        err.errors.push('Password must be at least 6 characters')
    }

    if (Validator.isEmpty(data.password2)) {
        err.errors.push('Confirm Password field is required')
    }

    if (!Validator.equals(data.password, data.password2)) {
        err.errors.push('Passwords must match')
    }

    if (err.errors.length) {
        err.title = 'Validation Error'
        err.status = 400
        next(err)
    }
    else next()
};
