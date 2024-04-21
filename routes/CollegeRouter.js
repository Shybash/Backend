// Router file (CollegeRouter.js)
const express = require('express');
const router = express.Router();
const ClgLoginController = require('../Controllers/ClgLogin-controller');
const ClgRegisterController = require('../Controllers/ClgRegister-controller');
const { StudentForm } = require('../Controllers/StudentForm');
const { CreateClub } = require('../Controllers/Club-controller');
const GetClubs = require('../Controllers/GetClubs');
const { AcceptStudent } = require('../Controllers/AcceptStudent');
const deleteStudent = require('../Controllers/deleteStudent');
const { GetClubMembers, deleteClubMember } = require('../Controllers/ClubMembers');
const GetQuery = require('../Controllers/GetQuery');
const DeleteQuery = require('../Controllers/DeleteQuery');

// Register route
router.post('/RegisterClg', ClgRegisterController);

// Login route
router.post('/LoginClg', ClgLoginController);

// Student list route
router.get('/StudentForm', StudentForm);

// Route for creating a club
router.post('/CreateClub', CreateClub);

router.get('/GetClubs', GetClubs);

router.post('/AcceptStudent/:id', AcceptStudent);

// Delete student route
router.delete('/deleteStudent/:id', deleteStudent); // Use the deleteStudent function

router.get('/GetClubMembers', GetClubMembers);

router.delete('/deleteClubMember/:clubName/:memberId', deleteClubMember);

router.get('/GetQuery',GetQuery);


router.delete('/deleteQuery/:id',DeleteQuery);


module.exports = router;
