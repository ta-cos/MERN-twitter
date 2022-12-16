const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTweetInput(req, res, next) {
    const err = {}, data = {};
    err.errors = [];
    const { text } = req.body

    data.text = validText(text) ? text : '';

    if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
        err.errors.push('Tweet must be between 5 and 140 characters');
    }

    if (Validator.isEmpty(data.text)) {
        err.errors.push('Text field is required');
    }

    if (err.errors.length) {
        err.title = 'Validation Error'
        err.status = 400
        next(err)
    } else next()
};
