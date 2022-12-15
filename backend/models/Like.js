const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    like: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'tweets'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tweet = mongoose.model('tweet', TweetSchema);
