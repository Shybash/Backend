const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const connection = require("./db");
const studentRoutes = require('./routes/StudentRoutes');
const collegeRoutes = require('./routes/CollegeRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://frontend-clubhub-virid.vercel.app",
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
// Session middleware with cookie options
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth configuration
const googleAuthOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/Student",
  authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
  tokenURL: 'https://accounts.google.com/o/oauth2/token'
};

passport.use(new GoogleStrategy(googleAuthOptions,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Database connection
connection();

// Routes
app.use("/api", studentRoutes);
app.use("/api", collegeRoutes);

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: true
  })
);

app.get('/Student',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log("User successfully authorized through Google.");
    const accessToken = req.user._json.access_token;
    res.cookie('googleAccessToken', accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    res.redirect('/Student');
  }
);

// Exchange authorization code for access token and create session cookie
app.get("/auth/token", async (req, res) => {
  const { code } = req.query;
  console.log("Received request with authorization code:", code);

  if (!code) {
    console.warn("No authorization code provided.");
    return res.status(400).json({ message: "Authorization code must be provided" });
  }

  try {
    const tokenParams = queryString.stringify({
      client_id: googleAuthOptions.clientID,
      client_secret: googleAuthOptions.clientSecret,
      code,
      redirect_uri: googleAuthOptions.callbackURL,
      grant_type: "authorization_code",
    });

    console.log("Token parameters:", tokenParams);

    const response = await axios.post(googleAuthOptions.tokenURL, tokenParams);
    const id_token = response.data.id_token;
    const refresh_token = response.data.refresh_token;
    console.log(refresh_token);

    if (!id_token) {
      console.warn("No id_token returned from OAuth server.");
      return res.status(400).json({ message: "Authorization error" });
    }

    const token = jwt.sign({ id_token }, process.env.TOKEN_SECRET, {
      expiresIn: '1h' // Adjust token expiration as needed
    });

    console.log("Setting cookie with JWT...");
    res.cookie("token", token, {
      maxAge: 1 * 60 * 60 * 1000, // Expires in 1 hour
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ id_token }); // Return id_token if needed
  } catch (err) {
    console.error("Error in token exchange:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to check if user is logged in
app.get("/auth/logged_in", (req, res) => {
  try {
    console.log("Checking login status...");
    const token = req.cookies.token;

    if (!token) {
      console.warn("No token found in cookies.");
      return res.json({ loggedIn: false });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const newToken = jwt.sign({ user: decoded.user }, process.env.TOKEN_SECRET, {
      expiresIn: '1h' // Adjust token expiration as needed
    });

    console.log("Resetting cookie with new token...");
    res.cookie("token", newToken, {
      maxAge: 1 * 60 * 60 * 1000, // Expires in 1 hour
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ loggedIn: true, user: decoded.user });
  } catch (err) {
    console.error("Error in checking login status:", err);
    res.json({ loggedIn: false });
  }
});

// Endpoint to log out
app.post('/auth/logout', (req, res) => {
  console.log('Logging out and clearing cookie...');
  res.clearCookie('googleAccessToken').json({ message: 'Logged out' });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.cookies.googleAccessToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // You can add additional validation or use the token as needed

  next();
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
