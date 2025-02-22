const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport'); 
require('dotenv').config();
const passportConfig = require('./config/passport'); 
const connection = require('./config/db');
const studentRoutes = require('./routes/StudentRoutes');
const collegeRoutes = require('./routes/CollegeRouter');
const PersonalInfo = require('./models/Stdinfo');
const app = express();

const allowedOrigins = ['https://frontend-clubhub-virid.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

passportConfig(passport); 

app.use(passport.initialize());

connection();
//passport 
const session = require('express-session');

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure:true, 
            maxAge: 3600000, 
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google', (req, res, next) => {
  console.log('Google authentication initiated');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  console.log("hi bro");
});

app.get('/auth/google/callback', passport.authenticate('google'), async (req, res) => {
  const { token } = req.user;
  console.log("token sent",token);
  console.log('Token:', token); 
  res.cookie('token', token, {
    httpOnly: true,
    secure:true,
    maxAge: 3600000,
    sameSite: 'None',
});

// res.status(200).json({ message: 'Cookie set successfully' });

      res.redirect('https://frontend-clubhub-virid.vercel.app');
});



app.use("/api", studentRoutes);
app.use("/api", collegeRoutes);
console.log(" em ro bidda");

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
