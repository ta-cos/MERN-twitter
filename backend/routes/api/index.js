const commentRouter = require('./comments')
const tweetsRouter = require('./tweets')
const likesRouter = require('./likes')
const userRouter = require('./users')
const express = require("express");
const router = express.Router();


router.get('/test', (req, res, next) => {
    res.json('API Router working')
});

router.use('/comments', commentRouter);
router.use('/tweets', tweetsRouter);
router.use('/likes', likesRouter);
router.use('/users', userRouter);

module.exports = router;
