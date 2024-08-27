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


module.exports = router;
