const passport = require('passport');
const UserModel = require('../models/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt_secret = process.env.JWT_SECRET || 'jwt_secret';


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
                done(error);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {

            UserModel.findOne({email: email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, {message: 'User already exists'});
                }
            })

            try {
                const user = await UserModel.create({
                    email: email,
                    password: password,
                    username: req.body.username,
                    age: req.body.age,
                    city: req.body.city,
                    country: req.body.country
                });
                return done(null, user);
            } catch (error) {

                done("User email maybe exist \n " + error);
            }
        }
    )
);




passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({email});

                if (!user) {
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, {message: 'Wrong Password'});
                }

                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                return done(error);
            }
        }
    )
);
