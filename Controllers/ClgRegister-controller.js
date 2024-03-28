const College = require('../models/College');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const RegisterClg= async(req, res, next) => {
    try {
        const { username, email, password, confirmpassword } = req.body;

        // Validate required fields
        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be at least 6 characters long" });
        }

        // Check if email already exists
        const exist = await College.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // Create new student document
        const college = await College.create({ username, email, password: hashedPassword ,confirmpassword});

        // Respond with the created student
        res.status(201).json({ college });
    } catch (error) {
        // Pass error to error handling middleware
        res.status(400).json({error:error.message});
    }
};

module.exports= RegisterClg;
