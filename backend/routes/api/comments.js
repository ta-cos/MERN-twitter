const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Comments are Connected')
})

router.post('/', (req, res, next) => {

})

router.get('/', (req, res, next) => {

})

router.get('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;
