const express = require('express');
const router = express.Router();
const { register } = require("../Controllers/Register-controller");
const { login } = require("../Controllers/Login-controller");
const studentForm = require("../Controllers/StudentForm-controller");
const deleteStudent = require('../Controllers/deleteStudent'); // Import the deleteStudent function
require('dotenv').config();

// Signup route
router.post('/register', register);

// Login route
router.post('/login', login);

// Student list route
router.post('/studentForm', studentForm);

// Delete student route
router.delete('/deleteStudent/:id', deleteStudent); // Use the deleteStudent function

module.exports = router;
