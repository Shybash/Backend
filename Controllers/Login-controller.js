const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PersonalInfo = require('../models/Stdinfo'); // Assuming you have a PersonalInfo model
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
            process.env.JWT_SECRET || 'fallback-secret-key', // Use a secure secret key
            { expiresIn: '1h' } // Set the token expiration time
        );

        const personalInfo = await PersonalInfo.findOne({ userId: student._id });

        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: personalInfo._id,
                email: student.email,
                name: personalInfo.name,
                collegeName: personalInfo.collegeName,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { login };
