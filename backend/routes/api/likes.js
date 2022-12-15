const express = require('express');
const router = express.Router();



router.post('api/test', function (req, res) {
    res.json({ requestBody: req.body });
});

router.get('/', (req, res) => {
    res.json('Likes are Connected')
})

router.post('/', (req, res, next) => {

})

router.get('/', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;
