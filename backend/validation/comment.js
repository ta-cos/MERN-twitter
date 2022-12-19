const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(req, res, next) {
    const err = {}, data = {};
    err.errors = [];
    const { text } = req.body

    data.text = validText(text) ? text : '';

    if (!Validator.isLength(data.text, { min: 5, max: 250 })) {
        err.errors.push('Comment must be between 5 and 250 characters');
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
