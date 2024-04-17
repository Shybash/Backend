const StudentForm = require('../models/StudentForm');

const studentForm = async (req, res, next) => {
    try {
        const { rollNum, name, contactNumber, club } = req.body;

        // Create a new student instance
        const newStudent = new StudentForm({
            rollNum,
            name,
            contactNumber,
            club
        });

        // Save the student data
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = studentForm;
