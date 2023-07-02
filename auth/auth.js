const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt_secret = process.env.JWT_SECRET || 'jwt_secret';

const bcrypt = require('bcrypt');


passport.use(
    new JWTstrategy(
        {
            secretOrKey: jwt_secret,
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter("auth_token")
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// Passport middlewares for local strategy
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({email});
        if (user) {
            return done(null, false, {message: 'User already exists'});
        }
        const new_user = await User.create({
            f_name: req.body.f_name || "test first name",
            l_name: req.body.l_name || "test last name",
            email: email,
            password: password,

            phone: req.body.phone || "",
            gender: req.body.gender || "Male",
            age: req.body.age || 20,
            // todo: how save cities
            cities: [req.body.city || "Cairo"],
            country: req.body.country || "Egypt",
            past_experience: req.body.past_experience || "No Experience",
            skills: req.body.skills || [],
        });
        await new_user.save();
        return done(null, new_user);
    } catch (error) {
        return done(error);
    }
}));


// there a bug for correct and incorrect password

passport.use('login',
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
        // here the error
            const user = await User.findOne({email: email});
            // console.log(user['password'])

            if (!user) {
                return done(null, false);
            }

            if (!user.isValidPassword(password)) {
                return done(null, false, {message: 'Wrong Password'});
            }

            return done(null, user);
        }
    )
)



