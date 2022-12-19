const { requireAuth } = require('../../utils/auth')
const Comment = require('../../models/Comment')
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();

router.post('/:tweetId', async (req, res, next) => {
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

    if (!tweet) {
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        return next(err)
    } else {
        tweet.likesCount++
        await tweet.save()
        res.json(tweet)
    }

})

router.post('/:commentId', async (req, res, next) => {

})

router.delete('/:tweetId', async (req, res, next) => {
    const err = {}
    const tweet = await Tweet.findById(req.params.tweetId)
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Tweet Id"]
            return next(err)
        })

    if (!tweet) {
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        return next(err)
    } else if (req.user.id != tweet.user) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        return next(err)
    } else if (tweet.likesCount <= 0) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        return next(err)
    } else {
        tweet.likesCount--;
        await tweet.save()
        return res.json(tweet)
    }
})

router.delete('/:commentId', async (req, res, next) => {

})

module.exports = router;
