const validateTweetInput = require('../../validation/tweets');
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();

//Routes are ordered by by test spec
router.post('/', validateTweetInput, async (req, res, next) => {

    const tweet = await Tweet.create({
        text: req.body.text,
        user: req.user.id
    });

    return res.json({ id: tweet.id, text: tweet.text, user: tweet.user })
});

router.get('/', async (req, res, next) => {
    const tweets = await Tweet.find()
        .sort({ date: -1 })
        .populate('comment')

    if (!tweets.length) {
        const err = {}
        err.title = 'No Data Found'
        err.status = '404'
        err.erros = ['no tweets at this time']
        next(err)
    }

    return res.json(tweets)
});

router.get('/user/:userId', async (req, res, next) => {
    const myTweets = await Tweet.find({ user: req.params.userId })

    if (!myTweets) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["You don't have any tweets yet"]
        next(err)
    } else return res.json(myTweets)
});

router.get('/:tweetId', async (req, res, next) => {
    const tweet = await Tweet.findById(req.params.tweetId)

    if (!tweet) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        next(err)
    } else res.json(tweet)
});

router.put('/:tweetId', validateTweetInput, async (req, res, next) => {
    const query = { id: req.params.id, user: req.user.id }
    const editTweet = await Tweet.findOne(query).select('id', 'text')

    if (!editTweet) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        next(err)
    } else {
        editTweet.text = req.body.text
        await editTweet.save()
        return res.json(editTweet)
    }
})

router.delete('/:tweetId', async (req, res, next) => {
    const tweet = await Tweet.findById(req.params.tweetId)

    if (!tweet) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        next(err)
    } else {
        const deleteTweet = await Tweet.deleteOne({
            id: req.params.id,
        })
        return res.json(deleteTweet)
    }
})

module.exports = router;
