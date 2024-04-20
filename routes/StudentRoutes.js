const express = require('express');
const router = express.Router();
const { register } = require("../Controllers/Register-controller");
const { login } = require("../Controllers/Login-controller");
const studentForm = require("../Controllers/StudentForm-controller");
const deleteStudent = require('../Controllers/deleteStudent'); // Import the deleteStudent function
const Profile = require('../Controllers/Profile');
const { StudentQuery } = require('../Controllers/StudentQuery');
require('dotenv').config();

// Signup route
router.post('/register', register);

// Login route
router.post('/login', login);

// Student list route
router.post('/studentForm', studentForm);


router.get('/student/:userId', Profile);

router.post('/StudentQuery', StudentQuery);
module.exports = router;
