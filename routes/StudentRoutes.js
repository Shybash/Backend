const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authenticate');

const { register } = require('../Controllers/Register-controller');
const { login } = require('../Controllers/Login-controller');
const studentForm = require('../Controllers/StudentForm-controller');
const deleteStudent = require('../Controllers/deleteStudent');
const Profile = require('../Controllers/Profile');
const { studentQuery } = require('../Controllers/StudentQuery');
const GetQuery = require('../Controllers/GetQuery');
const { getEvents } = require('../Controllers/GetEvents');

require('dotenv').config();


router.post('/register', register);
router.post('/login', login);
router.post('/studentForm', authMiddleware, studentForm); 
router.post('/StudentQuery', authMiddleware, studentQuery); 


router.get('/student/:userId', authMiddleware, Profile); 
router.get('/GetEvents', getEvents); 

router.get('/is-logged-in', authMiddleware, (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ loggedIn: true, user: req.user });
        } else {
            res.status(401).json({ loggedIn: false, user: null });
        }
    } catch (error) {
        console.error('Error while checking authentication:', error); // Logging for debugging
        res.status(500).json({ error: 'Server error while checking authentication' });
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while logging out' });
    }
});


module.exports = router;
