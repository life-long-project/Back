const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET || "jwt_secret";
const {
    validate_user_signup,
    validate_user_login,
    user_validation,
} = require("../../middlewares/validation/user");
const User = require("../../models/user");
const Activity = require("../../models/activity_log")


const router = express.Router();

// Route for user signup
router.post(
    "/signup",
    validate_user_signup,
    user_validation,
    passport.authenticate("signup", {session: false}),
    async (req, res, next) => {
        const user = req.user;
        let token = "";
        let message = "failed to login";
        req.login(user, {session: false}, async (error) => {
            if (error) return next(error);
            const body = {
                _id: user._id,
                email: user.email,
                username: user.full_name,
                is_admin: user.is_admin,
                is_blocked: user.is_blocked
            };
            token = jwt.sign({user: body}, jwt_secret);
            message = "Signup ,Login successful";
            await Activity.create({
                activity_message: message,
                posted_by_id: user._id,
                category: 'user',
                for_id: user._id
            })
        });
        res.status(201).json({
            message: message,
            user: req.user,
            auth_token: token,
        });
    }
);

router.post(
    "/login",
    validate_user_login,
    user_validation,
    passport.authenticate("login", {session: false}),
    async (req, res) => {
        try {
            const user = req.user;
            const body = {
                _id: user._id,
                email: user.email,
                is_admin: user.is_admin,
                is_reported: user.is_reported,
                username: user.full_name,
            };
            const token = jwt.sign({user: body}, jwt_secret);
            return res.json({
                auth_token: token,
                user: user,
            });
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
);

// router.get('/check_user',
//     passport.authenticate('login', { session: false }),
//     (req, res) => {
//         const user_id = req.user._id;
//         const user = User.findById(user_id)
//         if(user){
//             return res.status(200).json({message: "user exists"})
//         }else{
//             return res.status(400).json({message: "user not found"})
//         }
//     }
//
// )

module.exports = router;
