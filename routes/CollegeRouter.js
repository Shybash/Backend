const express = require('express');
const router = express.Router();
const ClgLoginController = require('../Controllers/ClgLogin-controller');
const ClgRegisterController = require('../Controllers/ClgRegister-controller');
const { StudentForm } = require('../Controllers/StudentForm');
const { createClub } = require('../controllers/Club-controller'); // Corrected import path

// Register route
router.post('/RegisterClg', ClgRegisterController);

// Login route
router.post('/LoginClg', ClgLoginController);

// Student list route
router.get('/StudentForm',StudentForm);

// Route for creating a club
router.post('/createClub', createClub); // Corrected route definition

module.exports = router;
