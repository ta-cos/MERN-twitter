const apiRouter = require('./api');
const express = require("express");
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.json('Router working')
})

router.use('/api', apiRouter)


module.exports = router;
