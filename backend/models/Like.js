const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'tweet'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Like = mongoose.model('Like', LikeSchema);
