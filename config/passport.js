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
            callbackURL: 'https://clubhub-backend.vercel.app/auth/google/callback'
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              let user = await User.findOne({ googleId: profile.id });
      
              if (!user) {
                user = await User.create({
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  image: profile.photos[0].value
                });
              }
      
              const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'fallback-secret-key',
                { expiresIn: '1h' }
              );
      
              return done(null, { user, token });
            } catch (err) {
              console.error('Error in Google Strategy:', err);
              return done(err, null);
            }
          }
        )
      );      
};
