const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET || 'jwt_secret';
const {validate_user_signup , validate_user_login, user_validation} = require('../../middlewares/validation/user')

const router = express.Router();


// Route for user signup
router.post('/signup',
    validate_user_signup,
    user_validation,
    passport.authenticate('signup', { session: false }), async (req, res,next) => {
        const user = req.user
        let token = ''
        let message ='failed to login'
        req.login(
            user,
            {session: false},
            async (error) => {
                if (error) return next(error);
                const body = {_id: user._id, email: user.email, username: user.username,is_admin: user.is_admin};
                token = jwt.sign({user: body}, jwt_secret);
                message = "Signup ,Login successful"
            }
        )
        res.status(201).json({
            message: message,
            user: req.user,
            auth_token: token
        });

});


router.post('/login',
    validate_user_login,
    user_validation,
    passport.authenticate('login', { session: false }), async (req, res) => {
    try {
        const user = req.user;
        const body = {
            _id: user._id,
            email: user.email,
            username: user.f_name + " " + user.l_name,
            is_admin: user.is_admin
        };
        const token = jwt.sign({ user: body }, jwt_secret);
        return res.json({ "auth_token": token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;