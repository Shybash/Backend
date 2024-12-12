const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    console.log(req.isAuthenticated());
    
    if(req.isAuthenticated())
    {
        next();
    }
    else{
    console.log('Auth middleware triggered');
    console.log('Cookies:', req.cookies);

    const token = req.cookies.token;
    if (!token) {
        console.error('Error: No token found in cookies');
        return res.status(401).json({ loggedIn: false, error: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        console.log('Token decoded successfully:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error: Token verification failed:', error);
        return res.status(401).json({ loggedIn: false, error: 'Invalid or expired token.' });
    }
}
};

module.exports = authMiddleware;
