const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PersonalInfo = require('../models/Stdinfo');
require('dotenv').config();

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: student._id },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: '1h' }
        );

        const personalInfo = await PersonalInfo.findOne({ userId: student._id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
            sameSite: 'None',
        });
        console.log("i have sent na");
        res.status(200).json({
            message: 'Login successful',
            user: {
                userId: student._id,
                email: student.email,
                name: personalInfo.name,
                collegeName: personalInfo.collegeName,
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { login };