const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PersonalInfo = require('../models/Stdinfo');
require('dotenv').config();

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ error: 'Invalid email or password' }); // Avoid revealing which is incorrect
        }
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' }); // Same generic message for security
        }
        const personalInfo = await PersonalInfo.findOne({ userId: student._id });
        if (!personalInfo) {
            return res.status(404).json({ error: 'Personal information not found' });
        }

        const token = jwt.sign(
            { userId: student._id }, 
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly:false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: personalInfo._id,
                email: student.email,
                name: personalInfo.name,
                collegeName: personalInfo.collegeName,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

module.exports = { login };
