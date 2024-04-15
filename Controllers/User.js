// Import necessary modules
const express = require('express');
const { User } = require('../models/Student'); // Import your User model
const verifyToken = require('../middleware/authenticate'); // Import the verifyToken middleware

// Create an Express router
const router = express.Router();

// Route to fetch user details
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return user details
        res.json({ name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Export the router
module.exports = router;
