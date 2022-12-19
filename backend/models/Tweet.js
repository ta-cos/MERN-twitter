const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likeCount:{
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
});

const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet
