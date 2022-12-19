const { requireAuth } = require('../../utils/auth')
const Comment = require('../../models/Comment')
const Tweet = require('../../models/Tweet');
const Like = require('../../models/Like')
const express = require('express');
const router = express.Router();

router.post('/tweets/:tweetId', requireAuth, async (req, res, next) => {
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
        next(err)
    }

    const isAlreadyLiked = await Like.findOne({ tweet: tweet.id, user: req.user.id })

    if (isAlreadyLiked) {
        err.title = 'Bad Request'
        err.status = 400
        err.errors = ["User Already Likes This Tweet"]
        next(err)
    } else {
        await Like.create({
            user: req.user.id,
            tweet: tweet.id
        })
        tweet.likeCount++
        await tweet.save()
        res.json(tweet)
    }

})

router.post('/comments/:commentId', requireAuth, async (req, res, next) => {
    const err = {}
    const comment = await Comment.findById(req.params.commentId)
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Comment Id"]
            return next(err)
        })

    if (!comment) {
        err.title = 'Comment Not Found'
        err.status = 404
        err.errors = ["Comment Not Found"]
        next(err)
    }

    const isAlreadyLiked = await Like.findOne({ comment: comment.id, user: req.user.id })

    if (isAlreadyLiked) {
        err.title = 'Bad Request'
        err.status = 400
        err.errors = ["User Already Likes This Coment"]
        next(err)
    } else {
        await Like.create({
            user: req.user.id,
            comment: comment.id
        })
        comment.likeCount++
        await comment.save()
        return res.json(comment)
    }
})

router.delete('/tweets/:tweetId', requireAuth, async (req, res, next) => {
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
    } else if (req.user.id != tweet.user) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        next(err)
    } else if (tweet.likeCount <= 0) {
        err.title = 'Bad Request'
        err.status = 401
        err.errors = ["No likes for this tweet yet"]
        next(err)
    } else {
        tweet.likeCount--;
        await tweet.save()
        res.json(tweet)
    }
})

router.delete('/comments/:commentId', requireAuth, async (req, res, next) => {
    const err = {}
    const { commentId } = req.params
    const comment = await Comment.findById(commentId)
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Comment Id"]
            return next(err)
        })

    if (!comment) {
        err.title = 'Comment Not Found'
        err.status = 404
        err.errors = ["Comment Not Found"]
        return next(err)
    } else if (comment.user != req.user.id) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        return next(err)
    } else if (comment.likeCount <= 0) {
        err.title = 'Bad Request'
        err.status = 401
        err.errors = ["No likes for this comment yet"]
        next(err)
    } else {
        const deleted = await Comment.deleteOne({ _id: commentId })
        return res.json(deleted)
    }
})

module.exports = router;
