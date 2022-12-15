const { setTokenCookie, requireAuth } = require('../../utils/auth');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.get('/current', (req, res, next) => {
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
                await setTokenCookie(res, user);
                return res.json({
                    id: user.id,
                    handle: user.handle,
                    email: user.email,
                })
            })
        })
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ error: 'This user does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    } else {
        return res.status(400).json({
            error: 'Incorrect password'
        });
    }

})

router.delete('/logout', (_req, res, next) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
})

module.exports = router;
