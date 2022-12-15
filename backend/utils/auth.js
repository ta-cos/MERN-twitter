const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const User = require('../models/User');

const { secret, expiresIn } = jwtConfig;

const toSafeObject = (res, user) => {
    const { id, handle } = user
    return newUser = {
        id,
        handle
    }
}

const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: toSafeObject(res, user) },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};


const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            console.log(User)
            const { id } = jwtPayload.data;
            req.user = await User.findById(id);
        } catch (e) {
            console.log(e)
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = ['Authentication required'];
    err.status = 401;
    return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth };
