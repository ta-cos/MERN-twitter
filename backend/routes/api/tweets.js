const validateTweetInput = require('../../validation/tweets');
const Tweet = require('../../models/Tweet');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});

router.post('/', validateTweetInput, (req, res, next) => {

    const newTweet = new Tweet({
        text: req.body.text,
        user: req.user.id
    });
    newTweet.save().then(tweet => res.json(tweet));
});

router.get('/user/:user_id', (req, res) => {
    Tweet.find({ user: req.params.user_id })
        .then(tweets => res.json(tweets))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No tweets found from that user' }
            )
        );
});

router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        );
});

router.put('/:id', validateTweetInput, async (req, res, next) => {
    const query = { id: req.params.id }
    const editTweet = await Tweet.findOneAndUpdate(query,
        {
            text: req.body.text,
        });
    if (!editTweet) res.status(404).json("Comment not found")
    res.json({ message: "Successfully Updated Tweet" })
})

router.delete(':/id', async (req, res, next) => {

})

module.exports = router;
