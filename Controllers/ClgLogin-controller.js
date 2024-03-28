const College = require('../models/College');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Clglogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const college = await College.findOne({ email });

        if (!college) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, college.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: college._id }, process.env.JWT_KEY || 'fallback_secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = Clglogin;
