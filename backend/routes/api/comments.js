const Comment = require('../../models/Comment')
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();

router.post('/:tweetId', async (req, res, next) => {
    const tweetId = req.params.tweetId
    const tweet = await Tweet.findById(tweetId)
        .catch()

    if (!tweet) return res.status(404).json({ error: 'Tweet not found' })

    const newComment = await Comment.create({
        text: req.body.text,
        tweet: tweetId
    });

    tweet.comments.push(newComment)
    await tweet.save()
    console.log(tweet)
    res.json(newComment)
})

router.get('/', async (req, res, next) => {
    const comments = await Comment.find().sort({ date: -1 })
    if (!comments.length) res.status(404).json({ error: "No Comments Found" })
    res.json(comments)
})

router.get('/:id', async (req, res, next) => {
    const comment = await Comment.find({ id: req.params.id })
    if (!comment.length) res.status(404).json({ error: "Comment Not Found" })
    res.json(comment)
})

router.put('/:id', async (req, res, next) => {
    const query = { id: req.params.id }
    const comment = Comment.findOneAndUpdate(query, {
        test: req.body.text
    })
    res.json(comment)
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
