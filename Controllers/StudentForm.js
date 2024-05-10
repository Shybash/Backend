// Import the required modules
const Student = require('../models/StudentForm'); // Assuming you have a Student model defined

// Define the controller function to fetch student form data grouped by club
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

    // Construct the response object
    const formattedData = {};
    groupedStudents.forEach(group => {
      formattedData[group._id] = group.students;
    });

    // Respond with the fetched data
    res.json(formattedData);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error fetching student form data:', error);
    res.status(500).json({ message: 'Failed to fetch student form data. Please try again later.' });
  }
};

// Export the controller function
module.exports = {
  StudentForm
};
