const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authenticate');

const ClgLoginController = require('../Controllers/ClgLogin-controller');
const ClgRegisterController = require('../Controllers/ClgRegister-controller');
const { StudentForm } = require('../Controllers/StudentForm');
const { CreateClub } = require('../Controllers/Club-controller');
const GetClubs = require('../Controllers/GetClubs');
const { AcceptStudent } = require('../Controllers/AcceptStudent');
const { GetClubMembers, deleteClubMember } = require('../Controllers/ClubMembers');
const GetQuery = require('../Controllers/GetQuery');
const DeleteQuery = require('../Controllers/DeleteQuery');
const { addEvent } = require('../Controllers/Events-controller');
const deleteStudent = require('../Controllers/deleteStudent');


router.post('/RegisterClg', ClgRegisterController);
router.post('/LoginClg', ClgLoginController);

router.post('/Events', authMiddleware, addEvent);
router.post('/CreateClub', authMiddleware, CreateClub);
router.post('/AcceptStudent/:id', authMiddleware, AcceptStudent);


router.get('/StudentForm', authMiddleware, StudentForm);
router.get('/GetClubs',  GetClubs);
router.get('/GetClubMembers', authMiddleware, GetClubMembers);
router.get('/GetQuery', authMiddleware, GetQuery);


router.delete('/deleteClubMember/:clubName/:memberId', authMiddleware, deleteClubMember);
router.delete('/deleteQuery/:id', authMiddleware, DeleteQuery);
router.delete('/deleteStudent/:id', authMiddleware, deleteStudent);;

module.exports = router;
