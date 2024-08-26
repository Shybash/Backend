const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/Authuser');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL:"https://clubhub-backend.vercel.app/auth/google/callback"
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                };

                try {
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        if (user.image !== profile.photos[0].value) {
                            user.image = profile.photos[0].value;
                            await user.save();
                        }
                    } else {
                        user = await User.create(newUser);
                    }
                    
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET || 'fallback-secret-key',
                        { expiresIn: '1h' }
                    );
                    user.token = token;
                    return done(null, user);
                } catch (err) {
                    console.error(err);
                    return done(err, null); 
                }
            }
        )
    );
};
