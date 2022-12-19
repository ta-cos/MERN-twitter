const validateCommentInput = require('../../validation/comment');
const { requireAuth } = require('../../utils/auth')
const Comment = require('../../models/Comment')
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const myComments = await Comment.find({ user: req.user.id })
    if (!myComments.length) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["You don't have any comments yet"]
        next(err)
    } else return res.json(myComments)
})

router.post('/:tweetId', requireAuth, validateCommentInput, async (req, res, next) => {
    const err = {}
    const tweetId = req.params.tweetId
    const tweet = await Tweet.findById(tweetId)
        .catch((e) => {
            err.title = 'Bad Request'
            err.message = e.message
            err.status = 400
            err.errors = ["Invalid Tweet Id"]
            return next(err)
        })

    if (!tweet) {
        err.title = 'Tweet Not Found'
        err.status = 404
        err.errors = ["Tweet Not Found"]
        return next(err)
    } else {
        const newComment = await Comment.create({
            text: req.body.text,
            tweet: tweetId,
            user: req.user.id
        });

        tweet.comments.push(newComment)
        await tweet.save()
        return res.json(newComment)
    }
})

router.put('/:commentId', requireAuth, validateCommentInput, async (req, res, next) => {
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
        return next(err)
    } else if (comment.user != req.user.id) {
        err.title = 'Unathorized'
        err.status = 401
        err.errors = ["Unathorized"]
        next(err)
    } else {
        comment.text = req.body.text
        await comment.save()
        return res.json(comment)
    }
})

router.delete('/:commentId', requireAuth, async (req, res, next) => {
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
    } else {
        const deleted = await Comment.deleteOne({ _id: commentId })
        return res.json(deleted)
    }
})

module.exports = router;
