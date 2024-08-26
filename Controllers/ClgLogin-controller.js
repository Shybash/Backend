const College = require('../models/College');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const collegeLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const college = await College.findOne({ email });
        if (!college) {
            return res.status(401).json({ error: 'Invalid email or password' }); 
        }

        const isPasswordValid = await bcrypt.compare(password, college.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const personalInfo = await PersonalInfo.findOne({ userId: college._id });
        if (!personalInfo) {
            return res.status(404).json({ error: 'Personal information not found' });
        }

        const token = jwt.sign(
            { userId: college._id },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: personalInfo._id,
                email: college.email,
                name: personalInfo.name,
                collegeName: personalInfo.collegeName,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

module.exports = collegeLogin;
