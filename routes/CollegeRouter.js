const express = require('express');
const router = express.Router();
const ClgLoginController = require('../Controllers/ClgLogin-controller');
const ClgRegisterController = require('../Controllers/ClgRegister-controller');
const { StudentForm } = require('../Controllers/StudentForm');
const { getAllClubs, createClub } = require('../Controllers/Club-controller');

// Register route
router.post('/RegisterClg', ClgRegisterController);

// Login route
router.post('/LoginClg', ClgLoginController);

// Student list route
router.get('/StudentForm',StudentForm);

//club
router.get('/getClub', getAllClubs);



router.post('/createClub',createClub);
module.exports = router;
