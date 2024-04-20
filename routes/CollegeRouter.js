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
const { StudentQuery, fetchStudentQueries } = require('../Controllers/StudentQuery'); // Corrected require path


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

router.post('/StudentQuery', StudentQuery);

router.get('/getQuery', fetchStudentQueries);
// Delete student route
router.delete('/deleteStudent/:id', deleteStudent); // Use the deleteStudent function

router.get('/GetClubMembers', GetClubMembers);

router.delete('/deleteClubMember/:clubName/:memberId', deleteClubMember);


module.exports = router;
