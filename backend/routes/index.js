const apiRouter = require('./api');
const express = require("express");
const router = express.Router();

router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

router.post("/api/test", function (req, res) {
    res.json({ requestBody: req.body });
});

router.use('/api', apiRouter)

module.exports = router;
