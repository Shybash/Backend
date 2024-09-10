const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        req.user = decoded; 

        console.log('Token Verified - User ID:', req.user.userId); // Add this log

        next(); 
    } catch (error) {
        console.error('Token Verification Error:', error); // Log token error
        res.status(401).json({ error: 'Invalid token.' });
    }
};


module.exports = authMiddleware;
