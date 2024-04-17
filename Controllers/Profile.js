const express = require('express');
const router = express.Router();
const Student = require('../models/Stdinfo'); // Assuming you have a Student model

const Profile = async (req, res) => {
  const userid= req.params.userId;

  try {
    const student = await Student.findById(userid);
    if (!student) {
      return res.status(404).send('Student not found');
    }
  
    res.send(student);
  } catch (error) {
    console.error('Error fetching student', error);
    res.status(500).send('Error fetching student');
  }
};

module.exports = Profile;
