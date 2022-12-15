const tweetsRouter = require('./tweets')
const userRouter = require('./users')
const express = require("express");
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.json('API Router working')
})

router.use('/users', userRouter);
router.use('/tweets', tweetsRouter)

module.exports = router;
