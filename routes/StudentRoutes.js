const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authenticate');
const mongoose = require("mongoose");
const { register } = require('../Controllers/Register-controller');
const { login } = require('../Controllers/Login-controller');
const studentForm = require('../Controllers/StudentForm-controller');
const deleteStudent = require('../Controllers/deleteStudent');
const Profile = require('../Controllers/Profile');
const { studentQuery } = require('../Controllers/StudentQuery');
const GetQuery = require('../Controllers/GetQuery');
const { getEvents } = require('../Controllers/GetEvents');
const PersonalInfo = require('../models/Stdinfo');

require('dotenv').config();


router.post('/register', register);
router.post('/login', login);
router.post('/studentForm', authMiddleware, studentForm); 
router.post('/StudentQuery', authMiddleware, studentQuery); 


router.get('/student/:userId', authMiddleware, Profile); 
router.get('/GetEvents', getEvents); 

router.get('/is-logged-in', authMiddleware, async (req, res) => {
    try {
        if(req.isAuthenticated())
        {
            const user  = req.user;
            console.log("is req.user",req.user);
            
            const personalInfo = await PersonalInfo.findOne({ userId: user._id });
            console.log(personalInfo);

            return res.status(200).json({loggedIn:true,user: {
                userId: personalInfo.userId,
                email: req.user.email,
                name: personalInfo.username,
                collegeName: personalInfo.collegeName,
            }});
        }
        if (req.user) {
            console.log('Authenticated user:', req.user);
            return res.status(200).json({ loggedIn: true, user: req.user });
        } else {
            return res.status(401).json({ loggedIn: false, user: null });
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ error: 'Server error while checking authentication.' });
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
