const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log("authn calledd");
    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'nooo  broo.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        req.user = decoded; 
        console.log(decoded);
        console.log("user authenticated");
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
