const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET || 'jwt_secret';

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', {session: false}),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);
router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        return res.status(500).json({message: (err.message || "An error occurred.")})
                        // return next(new Error("An error occurred."));
                    }
                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);

                            const body = {_id: user._id, email: user.email, username: user.username,is_admin: user.is_admin};
                            const token = jwt.sign({user: body}, jwt_secret);

                            return res.json({"auth_token": token});
                        }
                    );
                } catch (error) {
                    return res.status(500).json({message: (err|| "An error occurred.")})
                    // return next(error);
                }
            }
        )(req, res, next);
    }
);




module.exports = router;