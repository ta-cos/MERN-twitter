const validateTweetInput = require('../../validation/tweets');
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();

//Routes are ordered by by test specs
router.post('/', validateTweetInput, async (req, res, next) => {

    const tweet = await Tweet.create({
        text: req.body.text,
        user: req.user.id
    });

    return res.json(tweet)
});

router.get('/', async (req, res, next) => {
    const tweets = await Tweet.find()
        .sort({ date: -1 })

    if (!tweets.length) {
        const err = {}
        err.title = 'No Data Found'
        err.status = '404'
        err.erros = ['no tweets at this time']
        next(err)
    } else {
        return res.json(tweets)
    }
});

router.get('/current', async (req, res, next) => {
    const myTweets = await Tweet.find({ user: req.user.id })
        .populate()

    if (!myTweets) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["You don't have any tweets yet"]
        next(err)
    } else return res.json(myTweets)
});

router.get('/:tweetId', async (req, res, next) => {
    const err = {}

    const tweet = await Tweet.findById(req.params.tweetId)
        .populate()
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Tweet Id"]
            next(err)
        })
    //.catch will catch any erreros that arise becuase of type casting for findById
    if (!tweet) {
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        next(err)
    } else res.json(tweet)
});

router.put('/:tweetId', validateTweetInput, async (req, res, next) => {
    const err = {}
    const editTweet = await Tweet.findById(req.params.tweetId)
        .populate()

    if (req.user.id != editTweet.user) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        next(err)
    } else if (!editTweet) {
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
    const err = {}

    const tweet = await Tweet.findById(req.params.tweetId)
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Tweet Id"]
            next(err)
        })

    if (!tweet) {
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
