const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(req, res, next) {
    const err = {}
    err.errors = [];
    let data = {};
    const { email, password } = req.body

    data.email = validText(email) ? email : '';
    data.password = validText(password) ? password : '';


    if (!Validator.isEmail(data.email)) {
        err.errors.push('Email is invalid')
    }

    if (Validator.isEmpty(data.email)) {
        err.errors.push('Email field is required');
    }

    if (Validator.isEmpty(data.password)) {
        err.errors.push('Password field is required');
    }


    if (err.errors.length) {
        err.title = 'Validation Error'
        err.status = 400
        next(err)
    }
    else next()

};
