const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(400).send("Authorization token not found");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY || 'fallback_secret_key');
        req.user = decoded.user;
        console.log(req.user.id); // Logging user ID here
        req.id = req.user.id; // Assuming req.user has the user object with id
        next();
    } catch (err) {
        return res.status(500).send("Server error");
    }
};

module.exports = authenticate;
