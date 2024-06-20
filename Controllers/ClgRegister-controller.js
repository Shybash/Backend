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
        
       
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be at least 6 characters long" });
        }

       
        const exist = await College.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: "User already exists" });
        }

      
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const college = await College.create({ username, email, password: hashedPassword ,confirmpassword});

        res.status(201).json({ college });
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports= RegisterClg;
