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
                callbackURL: 'http://localhost:8000/auth/google/callback',
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
                        // If the user exists, update their profile image if it has changed
                        if (user.image !== profile.photos[0].value) {
                            user.image = profile.photos[0].value;
                            await user.save();
                        }
                    } else {
                        // If the user doesn't exist, create a new user
                        user = await User.create(newUser);
                    }

                    // Generate a JWT token for the authenticated user
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET || 'fallback-secret-key',
                        { expiresIn: '1h' }
                    );

                    // Attach the token to the user object
                    user.token = token;

                    // Call done with the user object (with the token)
                    return done(null, user);
                } catch (err) {
                    console.error(err);
                    return done(err, null); // Pass the error to the done callback
                }
            }
        )
    );
};
