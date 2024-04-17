const StudentForm = require("../models/StudentForm");

const studentForm = async (req, res, next) => {
  try {
    // Extract data from request body
    const { rollNum, name, contactNumber, club } = req.body;

    // Check if contact number is exactly 10 digits
    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be 10 digits." });
    }

    // Create a new student instance
    const newStudent = new StudentForm({
      rollNum,
      name,
      contactNumber,
      club,
    });

    // Save the student data
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = studentForm;
