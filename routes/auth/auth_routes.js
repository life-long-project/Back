const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET || 'jwt_secret';

const router = express.Router();


// Route for user signup
router.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => {
    res.status(201).json({ message: 'Signup & Login successful', user: req.user });
});


router.post('/login', passport.authenticate('login', { session: false }), async (req, res, next) => {
    try {
        const user = req.user;
        const body = {
            _id: user._id,
            email: user.email,
            username: user.username,
            is_admin: user.is_admin
        };
        const token = jwt.sign({ user: body }, jwt_secret);
        return res.json({ "auth_token": token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
});


module.exports = router;