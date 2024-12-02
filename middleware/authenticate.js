const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Auth middleware triggered');

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ loggedIn: false, error: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        req.user = decoded;
        console.log('User authenticated:', decoded);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ loggedIn: false, error: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
