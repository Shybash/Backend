const College = require('../models/College');
const ClgInfo = require('../models/ClgInfo');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerClg = async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;

        if (!username || !email || !password || !confirmpassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be at least 6 characters long" });
        }

        const existingCollege = await College.findOne({ email });
        if (existingCollege) {
            return res.status(400).json({ error: "User already exists" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const college = new College({
            username,
            email,
            password: hashedPassword
        });

        await college.save();

        const clgInfo = new ClgInfo({
            userId: college._id,
            username,
            email
        });

        await clgInfo.save();

        res.status(201).json({
            message: "College registered successfully",
            college,
            clgInfo
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = registerClg;
