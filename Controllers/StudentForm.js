
const Student = require('../models/StudentForm'); 
const StudentForm = async (req, res) => {
  try {
    // Aggregate to group students by club
    const groupedStudents = await Student.aggregate([
      {
        $group: {
          _id: '$club',
          students: { $push: '$$ROOT' }
        }
      }
    ]);

    const formattedData = {};
    groupedStudents.forEach(group => {
      formattedData[group._id] = group.students;
    });

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching student form data:', error);
    res.status(500).json({ message: 'Failed to fetch student form data. Please try again later.' });
  }
};

module.exports = {
  StudentForm
};
