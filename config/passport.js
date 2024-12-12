const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/Student');
const PersonalInfo = require('../models/Stdinfo'); 
const Student=require('../models/Student');

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
            try {
                 console.log("hello there");
                console.log('Google Strategy triggered');
                let user = await User.findOne({ googleId: profile.id });
                console.log('User from DB:', user);

                if (!user) {
                    const existingUser = await Student.findOne({ email: profile.emails[0].value });
                    if (existingUser) {
                        console.log('User with this email already exists:', existingUser.email);
                        return done(null, existingUser);
                    }
                
                    console.log('Creating new user via Google');
                    user = await Student.create({
                        email: profile.emails[0].value,
                        password: null, 
                        googleId: profile.id,
                    });
                }
                
                const personalInfo = await PersonalInfo.create({
                  userId: user._id,
                  username: profile.displayName,
                  email: profile.emails[0].value,
                  collegeName: '', 
              });
              console.log('Personal info created:', personalInfo);
          

          console.log('User found/created:', user);
                console.log('User found/created:', user);
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET || 'fallback-secret-key',
                    { expiresIn: '1h' }
                );
                console.log('Generated token:', token);

                return done(null, user);
            } catch (err) {
                console.error('Error in Google Strategy:', err);
                return done(err, null);
            }
        }
    )
);
     
};
