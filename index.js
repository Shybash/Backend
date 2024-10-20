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

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user || !req.user.token) {
        return res.status(500).send('Authentication failed: Token not found');
    }

    const { token } = req.user;

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: 'None',
    });
   
    res.redirect('https://frontend-clubhub-virid.vercel.app/student?google=true');
  });

app.use("/api", studentRoutes);
app.use("/api", collegeRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
