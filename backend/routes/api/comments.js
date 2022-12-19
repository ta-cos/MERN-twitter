const Comment = require('../../models/Comment')
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();


router.get('/current', async (req, res, next) => {
    const myComments = await Comment.find({ user: req.user.id })
    console.log(myComments)
    if (!myComments) {
        const err = {}
        err.title = 'Not Found'
        err.status = 404
        err.errors = ["You don't have any comments yet"]
        next(err)
    } else return res.json(myComments)
})

router.post('/:tweetId', async (req, res, next) => {
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
            tweet: tweetId
        });

        tweet.comments.push(newComment)
        await tweet.save()
        console.log(tweet)
        res.json(newComment)
    }
})

router.put('/:commentId', async (req, res, next) => {
    const err = {}
    const comment = Comment.findById(req.params.commentId)
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
    } else {
        console.log(comment)
        comment.text = req.body.text
        await comment.save()
        res.json(comment)
    }
})

router.delete('/:id', async (req, res, next) => {
    const query = { id: req.params.id }
    const comment = await Comment.find(query)
    if (!comment.length) return res.status(404).json({ error: 'Comment Not Found' })
    else {
        await Comment.deleteOne(query)
        res.json({ message: "Successfully Deleted comment" })
    }
})

module.exports = router;
