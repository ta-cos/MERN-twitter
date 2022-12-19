const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    likeCount: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);
