const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport'); 
require('dotenv').config();
const passportConfig = require('./config/passport'); 
const connection = require('./db');
const studentRoutes=require('./routes/StudentRoutes');
const collegeRoutes=require('./routes/CollegeRouter');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({ origin: "*", credentials: true }));


app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
}));

passportConfig(passport); 

app.use(passport.initialize());
app.use(passport.session());

connection();
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user || !req.user.token) {
        return res.status(500).send('Authentication failed: Token not found');
    }

    const { token } = req.user;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000
  });
  
  // console.log('Cookie set with token:', token); // Add this line
  

    res.redirect('https://frontend-clubhub-virid.vercel.app/student'); 
});


//Routes
app.use("/api",studentRoutes);
app.use("/api",collegeRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
