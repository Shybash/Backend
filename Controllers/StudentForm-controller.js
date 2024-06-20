const StudentForm = require("../models/StudentForm");

const studentForm = async (req, res, next) => {
  try {
    const { rollNum, name, contactNumber, club } = req.body;

    if (!/^\d{10}$/.test(contactNumber)) {
      return res
        .status(400)
        .json({ message: "Contact number must be 10 digits." });
    }

    const newStudent = new StudentForm({
      rollNum,
      name,
      contactNumber,
      club,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = studentForm;
