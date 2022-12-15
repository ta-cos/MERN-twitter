const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const commentRouter = require('./comments')
const User = require('../../models/User');
const tweetsRouter = require('./tweets')
const likesRouter = require('./likes')
const userRouter = require('./users')
const express = require("express");
const router = express.Router();

router.use(restoreUser); //keep this at top
router.use('/comments', commentRouter);
router.use('/tweets', tweetsRouter);
router.use('/likes', likesRouter);
router.use('/users', userRouter);

module.exports = router;
