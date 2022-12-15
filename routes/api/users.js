const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/test',  (req, res, next) => {
        res.json({ message: 'test successful' })
    })

router.get('/current', passport.authenticate(
    'jwt', { session: false }), (req, res, next) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
})

router.post('/register', async (req, res, next) => {
    // Check to make sure nobody has already registered with a duplicate email
    const { handle, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({
            email: "A user has already registered with this email address"
        })
    } else {
        // Otherwise create a new user
        const newUser = new User({
            handle,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) next(err);
                newUser.password = hash;
                const user = await newUser.save()
                return res.json(user)
            })
        })
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ email: 'This user does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
        const payload = { id: user.id, handle: user.handle };

        jwt.sign(
            payload,
            keys.secretOrKey,
            // Tell the key to expire in one hour
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    message: "Successfull login",
                    token: "Bearer " + token
                });
            });
    } else {
        return res.status(400).json({
            password: 'Incorrect password'
        });
    }

})

module.exports = router;
